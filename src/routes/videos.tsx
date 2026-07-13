import { mapWorkoutVideo } from "@/lib/mappers.server";
import { prisma } from "@/lib/prisma.server";
import { requireUser } from "@/lib/session.server";
import { EQUIPMENT_IDS, INTENSITY_LEVELS, MUSCLE_GROUP_IDS, keepValid } from "@/lib/taxonomy";
import type { WorkoutVideo } from "@/lib/types";
import { VideosPage } from "@/pages/videos-page";
import type { Prisma } from "@prisma/client";
import type { LoaderFunctionArgs } from "react-router";

export interface VideoFilterState {
  search: string;
  muscleGroups: string[];
  equipment: string[];
  intensity: string[];
  durationMin: number;
  durationMax: number;
}

const DEFAULT_DURATION_MIN = 0;
const DEFAULT_DURATION_MAX = 60;

function parseFilters(url: URL): VideoFilterState {
  const csv = (key: string) =>
    (url.searchParams.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const num = (key: string, fallback: number) => {
    const raw = url.searchParams.get(key);
    const n = raw === null ? Number.NaN : Number(raw);
    return Number.isFinite(n) ? n : fallback;
  };

  return {
    search: (url.searchParams.get("q") ?? "").trim(),
    // validate against the canonical taxonomy so bogus URL values are ignored
    muscleGroups: keepValid(csv("muscleGroups"), MUSCLE_GROUP_IDS),
    equipment: keepValid(csv("equipment"), EQUIPMENT_IDS),
    intensity: keepValid(csv("intensity"), [...INTENSITY_LEVELS]),
    durationMin: Math.max(0, num("durationMin", DEFAULT_DURATION_MIN)),
    durationMax: Math.min(60, num("durationMax", DEFAULT_DURATION_MAX)),
  };
}

function buildWhere(filters: VideoFilterState): Prisma.WorkoutVideoWhereInput {
  const where: Prisma.WorkoutVideoWhereInput = {};

  if (filters.search) {
    where.title = { contains: filters.search, mode: "insensitive" };
  }
  // muscle groups: match videos hitting ANY selected group (OR)
  if (filters.muscleGroups.length > 0) {
    where.muscleGroups = { hasSome: filters.muscleGroups };
  }
  // equipment: video must satisfy ALL selected equipment (AND)
  if (filters.equipment.length > 0) {
    where.equipmentNeeded = { hasEvery: filters.equipment };
  }
  if (filters.intensity.length > 0) {
    where.intensity = { in: filters.intensity };
  }
  // duration stored in seconds; filter UI works in minutes
  const onlyDefaultDuration =
    filters.durationMin === DEFAULT_DURATION_MIN && filters.durationMax === DEFAULT_DURATION_MAX;
  if (!onlyDefaultDuration) {
    where.duration = {
      gte: filters.durationMin * 60,
      lte: filters.durationMax * 60,
    };
  }

  return where;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const filters = parseFilters(new URL(request.url));

  const [videos, scheduled] = await Promise.all([
    prisma.workoutVideo.findMany({
      where: buildWhere(filters),
      orderBy: [{ qualityScore: "desc" }, { createdAt: "desc" }],
    }),
    prisma.scheduledWorkout.findMany({
      where: { userId: user.id },
      select: { id: true, videoId: true, scheduledDate: true, isCompleted: true },
      orderBy: { scheduledDate: "asc" },
    }),
  ]);

  const scheduledByVideo = new Map<string, (typeof scheduled)[number]>();
  for (const sched of scheduled) {
    const existing = scheduledByVideo.get(sched.videoId);
    if (!existing || sched.scheduledDate < existing.scheduledDate) {
      scheduledByVideo.set(sched.videoId, sched);
    }
  }

  const mapped = videos.map((video) => mapWorkoutVideo(video, scheduledByVideo.get(video.id)));

  return { videos: mapped as WorkoutVideo[], filters };
}

export default VideosPage;
