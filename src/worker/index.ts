import { prisma } from "../lib/prisma.server";
import { analyzeTraining } from "./analyze-training";
import { analyzeTrainingLLM } from "./analyze-training-llm";
import { createBoss } from "./boss";
import { fetchYouTubeComments, fetchYouTubeVideo } from "./youtube";

const QUEUE_NAME = "youtube-ingestion";

type IngestionPayload = {
  youtubeId: string;
  force?: boolean;
};

type IngestionResult = {
  analyzerUsed: "rules" | "llm";
  missingFields: string[];
  analysis: {
    qualityScore: number;
    trainingType: string | null;
  };
};

async function ingestVideo(payload: IngestionPayload): Promise<IngestionResult> {
  const { youtubeId } = payload;
  const existing = await prisma.workoutVideo.findUnique({ where: { youtubeId } });

  if (existing?.analyzedAt && !payload.force) {
    return {
      analyzerUsed: "rules",
      missingFields: [],
      analysis: {
        qualityScore: existing.qualityScore ?? 0,
        trainingType: existing.trainingType ?? null,
      },
    };
  }

  const [videoDetails, comments] = await Promise.all([
    fetchYouTubeVideo(youtubeId),
    fetchYouTubeComments(youtubeId, 30),
  ]);

  const analysisSource = [
    videoDetails.title,
    videoDetails.description,
    ...comments.map((comment) => comment.text),
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 12_000);

  let analysis = analyzeTraining(analysisSource);
  let analyzerUsed: "rules" | "llm" = "rules";
  if (process.env.OPENAI_API_KEY) {
    try {
      analysis = await analyzeTrainingLLM(analysisSource);
      analyzerUsed = "llm";
    } catch (error) {
      console.error("LLM analysis failed, falling back to rules.", error);
    }
  }

  const missingFields = [
    analysis.trainingType ? null : "trainingType",
    analysis.equipmentNeeded.length ? null : "equipmentNeeded",
    analysis.muscleGroups.length ? null : "muscleGroups",
    analysis.trainingTags.length ? null : "trainingTags",
  ].filter((value): value is string => Boolean(value));

  console.info("Ingestion analysis", {
    youtubeId,
    analyzerUsed,
    qualityScore: analysis.qualityScore,
    missingFields,
  });

  await prisma.workoutVideo.upsert({
    where: { youtubeId },
    update: {
      title: videoDetails.title || existing?.title || "Untitled Workout",
      channelName: videoDetails.channelName || existing?.channelName || "YouTube",
      channelThumbnail: videoDetails.channelThumbnail || existing?.channelThumbnail || "",
      thumbnailUrl: videoDetails.thumbnailUrl || existing?.thumbnailUrl || "",
      description: videoDetails.description,
      publishedAt: videoDetails.publishedAt,
      commentCount: videoDetails.commentCount,
      duration: videoDetails.durationSeconds || existing?.duration || 0,
      intensity: analysis.intensity,
      muscleGroups: analysis.muscleGroups,
      equipmentNeeded: analysis.equipmentNeeded,
      trainingType: analysis.trainingType,
      trainingTags: analysis.trainingTags,
      coachTone: analysis.coachTone,
      qualityScore: analysis.qualityScore,
      safetyNotes: analysis.safetyNotes,
      analyzedAt: new Date(),
    },
    create: {
      youtubeId,
      title: videoDetails.title || "Untitled Workout",
      channelName: videoDetails.channelName || "YouTube",
      channelThumbnail: videoDetails.channelThumbnail || "",
      thumbnailUrl: videoDetails.thumbnailUrl || "",
      description: videoDetails.description,
      publishedAt: videoDetails.publishedAt,
      commentCount: videoDetails.commentCount,
      duration: videoDetails.durationSeconds || 0,
      intensity: analysis.intensity,
      muscleGroups: analysis.muscleGroups,
      equipmentNeeded: analysis.equipmentNeeded,
      trainingType: analysis.trainingType,
      trainingTags: analysis.trainingTags,
      coachTone: analysis.coachTone,
      qualityScore: analysis.qualityScore,
      safetyNotes: analysis.safetyNotes,
      analyzedAt: new Date(),
      exercises: [],
    },
  });

  return {
    analyzerUsed,
    missingFields,
    analysis: {
      qualityScore: analysis.qualityScore,
      trainingType: analysis.trainingType,
    },
  };
}

async function main() {
  const boss = createBoss();
  await boss.start();

  boss.on("error", (error) => {
    console.error("pg-boss error", error);
  });

  await boss.work<IngestionPayload>(QUEUE_NAME, { batchSize: 2 }, async (jobs) => {
    for (const job of jobs) {
      if (!job.data?.youtubeId) {
        throw new Error("Missing youtubeId in job payload.");
      }
      try {
        const result = await ingestVideo(job.data);
        await prisma.ingestionEvent.create({
          data: {
            youtubeId: job.data.youtubeId,
            analyzerUsed: result.analyzerUsed,
            qualityScore: result.analysis.qualityScore,
            missingFields: result.missingFields,
          },
        });
      } catch (error) {
        await prisma.ingestionEvent.create({
          data: {
            youtubeId: job.data.youtubeId,
            analyzerUsed: "error",
            errorMessage: error instanceof Error ? error.message : String(error),
          },
        });
        throw error;
      }
    }
  });

  const shutdown = async () => {
    await boss.stop();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
