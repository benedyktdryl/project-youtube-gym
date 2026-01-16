import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  console.log("Seeding synthetic workout dataset...");
  const passwordHash = await bcrypt.hash("Demo123!", 10);
  const userPasswordHash = await bcrypt.hash("User123!", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@trainflow.com" },
    update: {},
    create: {
      email: "demo@trainflow.com",
      passwordHash,
      name: "Demo User",
      role: "admin",
      avatarUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  });

  const regularUser = await prisma.user.upsert({
    where: { email: "user@trainflow.com" },
    update: {},
    create: {
      email: "user@trainflow.com",
      passwordHash: userPasswordHash,
      name: "Regular User",
      role: "user",
      avatarUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  });

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      goal: "muscle-gain",
      preferredDuration: 30,
      preferredIntensity: "medium",
      availableEquipment: ["mat", "dumbbells", "resistance-bands"],
      preferredDays: ["monday", "wednesday", "friday", "saturday"],
    },
  });

  await prisma.userPreference.upsert({
    where: { userId: regularUser.id },
    update: {},
    create: {
      userId: regularUser.id,
      goal: "general-fitness",
      preferredDuration: 20,
      preferredIntensity: "low",
      availableEquipment: [],
      preferredDays: [],
    },
  });

  const videoTemplates = [
    {
      youtubeId: "ml6cT4AZdqI",
      title: "30 Min Full Body HIIT Workout",
      channelName: "MadFit",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/ml6cT4AZdqI/maxresdefault.jpg",
      duration: 1800,
      intensity: "high",
      muscleGroups: ["full-body", "cardio"],
      equipmentNeeded: ["mat"],
      trainingType: "hiit",
      trainingTags: ["hiit", "cardio", "fat-loss"],
      coachTone: "motivational",
      qualityScore: 88,
      safetyNotes: "Low-impact modifications included.",
      commentCount: 1345,
      publishedAt: new Date("2023-09-01T10:00:00Z"),
      description: "Sweaty full-body HIIT with built-in warmup and cooldown.",
      exercises: [
        {
          name: "Jumping Jacks",
          startTime: 120,
          endTime: 150,
          muscleGroup: "cardio",
          difficulty: "beginner",
        },
        {
          name: "Squats",
          startTime: 180,
          endTime: 210,
          muscleGroup: "quads",
          difficulty: "beginner",
        },
        {
          name: "Mountain Climbers",
          startTime: 240,
          endTime: 270,
          muscleGroup: "core",
          difficulty: "intermediate",
        },
      ],
    },
    {
      youtubeId: "UyTR2EjTAXU",
      title: "20 Min Arm Workout with Dumbbells",
      channelName: "Pamela Reif",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKaXBBAlwy4iuLJVzgYHDtlTnUmV4XwO5u_P7qKZKA=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/UyTR2EjTAXU/maxresdefault.jpg",
      duration: 1200,
      intensity: "medium",
      muscleGroups: ["biceps", "triceps", "shoulders"],
      equipmentNeeded: ["dumbbells"],
      trainingType: "strength",
      trainingTags: ["upper-body", "hypertrophy", "toning"],
      coachTone: "encouraging",
      qualityScore: 82,
      safetyNotes: "Cue to avoid shrugging shoulders during presses.",
      commentCount: 923,
      publishedAt: new Date("2023-08-12T14:00:00Z"),
      description: "Dumbbell arm burner focusing on form and time-under-tension.",
      exercises: [
        {
          name: "Bicep Curls",
          startTime: 90,
          endTime: 120,
          muscleGroup: "biceps",
          difficulty: "beginner",
        },
        {
          name: "Overhead Press",
          startTime: 180,
          endTime: 210,
          muscleGroup: "shoulders",
          difficulty: "intermediate",
        },
        {
          name: "Skull Crushers",
          startTime: 270,
          endTime: 300,
          muscleGroup: "triceps",
          difficulty: "intermediate",
        },
      ],
    },
    {
      youtubeId: "AnYl6Nk9GOA",
      title: "15 Min Abs Workout",
      channelName: "Chloe Ting",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKb3JO87LkWT5LPLJXzs_2mOcfINB7B42yNY5arSIQ=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/AnYl6Nk9GOA/maxresdefault.jpg",
      duration: 900,
      intensity: "medium",
      muscleGroups: ["abs"],
      equipmentNeeded: ["mat"],
      trainingType: "core",
      trainingTags: ["core", "stability", "no-jump"],
      coachTone: "supportive",
      qualityScore: 79,
      safetyNotes: "Keep lower back pressed into mat during crunches.",
      commentCount: 2144,
      publishedAt: new Date("2023-07-05T10:30:00Z"),
      description: "Quick abs blast with slow-tempo sets and optional modifications.",
      exercises: [
        {
          name: "Plank",
          startTime: 150,
          endTime: 180,
          muscleGroup: "abs",
          difficulty: "intermediate",
        },
        {
          name: "Russian Twists",
          startTime: 240,
          endTime: 270,
          muscleGroup: "obliques",
          difficulty: "beginner",
        },
        {
          name: "Dead Bug",
          startTime: 330,
          endTime: 360,
          muscleGroup: "core",
          difficulty: "beginner",
        },
      ],
    },
    {
      youtubeId: "X0r-OOKb-qw",
      title: "30 Min Lower Body Strength",
      channelName: "MadFit",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/X0r-OOKb-qw/maxresdefault.jpg",
      duration: 1800,
      intensity: "high",
      muscleGroups: ["quads", "hamstrings", "glutes"],
      equipmentNeeded: ["mat", "dumbbells"],
      trainingType: "strength",
      trainingTags: ["legs", "glutes", "posterior-chain"],
      coachTone: "technical",
      qualityScore: 90,
      safetyNotes: "Hip hinge cues to protect lower back.",
      commentCount: 1880,
      publishedAt: new Date("2023-05-18T09:00:00Z"),
      description: "Structured leg day with tempo squats and hinge variations.",
      exercises: [
        {
          name: "Tempo Squat",
          startTime: 120,
          endTime: 180,
          muscleGroup: "quads",
          difficulty: "intermediate",
        },
        {
          name: "Romanian Deadlift",
          startTime: 240,
          endTime: 300,
          muscleGroup: "hamstrings",
          difficulty: "intermediate",
        },
        {
          name: "Split Squat",
          startTime: 360,
          endTime: 420,
          muscleGroup: "glutes",
          difficulty: "advanced",
        },
      ],
    },
    {
      youtubeId: "A6e0PLUUJkk",
      title: "25 Min Mobility & Stretch Flow",
      channelName: "Move with Nicole",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKaB4EGNE_f2LWB7K4TMmk2gCr_c5agJPFnDmTbY3g=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/A6e0PLUUJkk/maxresdefault.jpg",
      duration: 1500,
      intensity: "low",
      muscleGroups: ["full-body", "mobility"],
      equipmentNeeded: ["mat"],
      trainingType: "mobility",
      trainingTags: ["recovery", "stretch", "yoga"],
      coachTone: "calming",
      qualityScore: 76,
      safetyNotes: "Encourage pain-free range of motion only.",
      commentCount: 654,
      publishedAt: new Date("2023-11-02T16:00:00Z"),
      description: "Gentle mobility flow to improve range of motion and recovery.",
      exercises: [
        {
          name: "World's Greatest Stretch",
          startTime: 90,
          endTime: 150,
          muscleGroup: "hips",
          difficulty: "beginner",
        },
        {
          name: "Cat Cow",
          startTime: 210,
          endTime: 240,
          muscleGroup: "spine",
          difficulty: "beginner",
        },
        {
          name: "Pigeon Pose",
          startTime: 360,
          endTime: 390,
          muscleGroup: "glutes",
          difficulty: "beginner",
        },
      ],
    },
    {
      youtubeId: "fcb5sD0s1x4",
      title: "18 Min Low-Impact Cardio",
      channelName: "Grow with Jo",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/AIf8zZSlo5YKxcofuP1Jdo86BEhl98I5QeVQfjZnEcRDeA=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/fcb5sD0s1x4/maxresdefault.jpg",
      duration: 1080,
      intensity: "low",
      muscleGroups: ["full-body", "cardio"],
      equipmentNeeded: [],
      trainingType: "cardio",
      trainingTags: ["low-impact", "steps", "beginner"],
      coachTone: "friendly",
      qualityScore: 73,
      safetyNotes: "Joint-friendly pacing; keep heels down on marches.",
      commentCount: 432,
      publishedAt: new Date("2024-01-10T18:00:00Z"),
      description: "Apartment-friendly cardio to boost steps without jumping.",
      exercises: [
        {
          name: "March in Place",
          startTime: 60,
          endTime: 120,
          muscleGroup: "cardio",
          difficulty: "beginner",
        },
        {
          name: "Side Steps",
          startTime: 180,
          endTime: 240,
          muscleGroup: "cardio",
          difficulty: "beginner",
        },
        {
          name: "Knee Drives",
          startTime: 300,
          endTime: 360,
          muscleGroup: "core",
          difficulty: "beginner",
        },
      ],
    },
    {
      youtubeId: "ySdjwk0A3n0",
      title: "40 Min Strength + Conditioning",
      channelName: "Caroline Girvan",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKb3MGBEW8i--12XKZvGMhfy7eQqa6MpyKouy1eP=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/ySdjwk0A3n0/maxresdefault.jpg",
      duration: 2400,
      intensity: "high",
      muscleGroups: ["full-body", "legs", "core"],
      equipmentNeeded: ["dumbbells", "mat"],
      trainingType: "strength-conditioning",
      trainingTags: ["strength", "conditioning", "full-body"],
      coachTone: "focused",
      qualityScore: 92,
      safetyNotes: "Rest as needed; maintain neutral spine on rows.",
      commentCount: 2010,
      publishedAt: new Date("2024-02-14T08:00:00Z"),
      description: "Strength supersets paired with cardio finishers.",
      exercises: [
        {
          name: "Goblet Squat",
          startTime: 180,
          endTime: 240,
          muscleGroup: "quads",
          difficulty: "intermediate",
        },
        {
          name: "Bent Row",
          startTime: 360,
          endTime: 420,
          muscleGroup: "back",
          difficulty: "intermediate",
        },
        {
          name: "Burpee Step-Out",
          startTime: 540,
          endTime: 600,
          muscleGroup: "full-body",
          difficulty: "advanced",
        },
      ],
    },
    {
      youtubeId: "0P-1Sg1DNNM",
      title: "22 Min Glute Activation",
      channelName: "Heather Robertson",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKaYMeTUMUZmccqkL3TkuFzFvLzDSGvg2W7YDrHD=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/0P-1Sg1DNNM/maxresdefault.jpg",
      duration: 1320,
      intensity: "medium",
      muscleGroups: ["glutes", "hips"],
      equipmentNeeded: ["resistance-bands", "mat"],
      trainingType: "activation",
      trainingTags: ["glutes", "warmup", "bands"],
      coachTone: "calm",
      qualityScore: 80,
      safetyNotes: "Avoid knee collapse on banded squats.",
      commentCount: 812,
      publishedAt: new Date("2024-03-03T12:00:00Z"),
      description: "Banded activation series to fire up glutes before heavy lifts.",
      exercises: [
        {
          name: "Glute Bridge",
          startTime: 90,
          endTime: 150,
          muscleGroup: "glutes",
          difficulty: "beginner",
        },
        {
          name: "Clamshell",
          startTime: 210,
          endTime: 270,
          muscleGroup: "hips",
          difficulty: "beginner",
        },
        {
          name: "Banded Squat Pulse",
          startTime: 330,
          endTime: 390,
          muscleGroup: "glutes",
          difficulty: "intermediate",
        },
      ],
    },
    {
      youtubeId: "z6N_3sC0Vxw",
      title: "12 Min Core Tabata Burner",
      channelName: "Sydney Cummings",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/AOPolaR3PQGmUFbClhl72l8LBZSQ9axZzJ9hA2wrQOEf=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/z6N_3sC0Vxw/maxresdefault.jpg",
      duration: 720,
      intensity: "high",
      muscleGroups: ["abs", "core"],
      equipmentNeeded: ["mat"],
      trainingType: "hiit-core",
      trainingTags: ["tabata", "core", "no-equipment"],
      coachTone: "high-energy",
      qualityScore: 85,
      safetyNotes: "Engage core on every rep; option to drop to knees for planks.",
      commentCount: 1299,
      publishedAt: new Date("2024-03-20T11:00:00Z"),
      description: "Short and spicy core Tabata with 20s on / 10s off intervals.",
      exercises: [
        {
          name: "High Plank Jack",
          startTime: 60,
          endTime: 90,
          muscleGroup: "core",
          difficulty: "advanced",
        },
        {
          name: "Bicycle Crunch",
          startTime: 150,
          endTime: 180,
          muscleGroup: "abs",
          difficulty: "intermediate",
        },
        {
          name: "Hollow Hold",
          startTime: 300,
          endTime: 330,
          muscleGroup: "core",
          difficulty: "advanced",
        },
      ],
    },
    {
      youtubeId: "WmDgkWZl3h0",
      title: "45 Min Yoga for Strength & Balance",
      channelName: "Yoga With Adriene",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKa0z17pT3OkrkZG7yL2msYoeQxKxO8WVtH2XYmZiQ=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/WmDgkWZl3h0/maxresdefault.jpg",
      duration: 2700,
      intensity: "medium",
      muscleGroups: ["full-body", "mobility", "core"],
      equipmentNeeded: ["mat"],
      trainingType: "yoga",
      trainingTags: ["balance", "mobility", "strength"],
      coachTone: "calming",
      qualityScore: 87,
      safetyNotes: "Mind joints in deep lunges; use blocks as needed.",
      commentCount: 3311,
      publishedAt: new Date("2023-12-15T09:30:00Z"),
      description: "Slow flow to build stability, balance, and breath awareness.",
      exercises: [
        {
          name: "Sun Salutation",
          startTime: 120,
          endTime: 300,
          muscleGroup: "full-body",
          difficulty: "beginner",
        },
        {
          name: "Warrior II Flow",
          startTime: 480,
          endTime: 600,
          muscleGroup: "legs",
          difficulty: "intermediate",
        },
        {
          name: "Half Moon",
          startTime: 900,
          endTime: 960,
          muscleGroup: "glutes",
          difficulty: "intermediate",
        },
      ],
    },
    {
      youtubeId: "nWgjYHzgQDY",
      title: "35 Min Kettlebell Strength",
      channelName: "HASfit",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKa9-7A2wVw7r7xx2ZsKSxbnnO8FXtSf7gYMgCfSqg=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/nWgjYHzgQDY/maxresdefault.jpg",
      duration: 2100,
      intensity: "high",
      muscleGroups: ["full-body", "back", "glutes"],
      equipmentNeeded: ["kettlebell", "mat"],
      trainingType: "strength",
      trainingTags: ["kettlebell", "power", "conditioning"],
      coachTone: "coaching",
      qualityScore: 84,
      safetyNotes: "Keep spine neutral on swings; hinge rather than squat.",
      commentCount: 1011,
      publishedAt: new Date("2024-04-05T13:00:00Z"),
      description: "Explosive kettlebell session mixing swings, cleans, and presses.",
      exercises: [
        {
          name: "Kettlebell Swing",
          startTime: 120,
          endTime: 210,
          muscleGroup: "glutes",
          difficulty: "intermediate",
        },
        {
          name: "KB Clean & Press",
          startTime: 360,
          endTime: 420,
          muscleGroup: "full-body",
          difficulty: "advanced",
        },
        {
          name: "KB Row",
          startTime: 540,
          endTime: 600,
          muscleGroup: "back",
          difficulty: "intermediate",
        },
      ],
    },
    {
      youtubeId: "7sPnQDfUXSI",
      title: "28 Min Power Walk + Light Weights",
      channelName: "Walk at Home",
      channelThumbnail:
        "https://yt3.googleusercontent.com/ytc/APkrFKYI3jo1wxz1cP5FcopEei0tDPQBZhcWYsdw_HeX=s176-c-k-c0x00ffffff-no-rj",
      thumbnailUrl: "https://i.ytimg.com/vi/7sPnQDfUXSI/maxresdefault.jpg",
      duration: 1680,
      intensity: "low",
      muscleGroups: ["cardio", "full-body"],
      equipmentNeeded: ["dumbbells", "mat"],
      trainingType: "cardio-strength",
      trainingTags: ["walk", "low-impact", "light-weights"],
      coachTone: "friendly",
      qualityScore: 72,
      safetyNotes: "Keep steps light; use 1–3 lb dumbbells only.",
      commentCount: 512,
      publishedAt: new Date("2024-01-22T07:30:00Z"),
      description: "Indoor power walk with sprinkled-in light dumbbell moves.",
      exercises: [
        {
          name: "Walk + Bicep Curl",
          startTime: 120,
          endTime: 180,
          muscleGroup: "cardio",
          difficulty: "beginner",
        },
        {
          name: "Side Step Press",
          startTime: 300,
          endTime: 360,
          muscleGroup: "shoulders",
          difficulty: "beginner",
        },
        {
          name: "Kickback Walk",
          startTime: 480,
          endTime: 540,
          muscleGroup: "triceps",
          difficulty: "beginner",
        },
      ],
    },
  ];

  const videoRecords = await Promise.all(
    videoTemplates.map((video) =>
      prisma.workoutVideo.upsert({
        where: { youtubeId: video.youtubeId },
        update: video,
        create: {
          ...video,
          analyzedAt: new Date(),
        },
      }),
    ),
  );

  const getDate = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const schedule = [
    { youtubeId: "ml6cT4AZdqI", offset: -2, completed: true },
    { youtubeId: "AnYl6Nk9GOA", offset: -1, completed: false },
    { youtubeId: "UyTR2EjTAXU", offset: 1, completed: false },
    { youtubeId: "X0r-OOKb-qw", offset: 3, completed: false },
    { youtubeId: "ySdjwk0A3n0", offset: 5, completed: false },
  ];

  const scheduleForUser = async (userId) => {
    for (const item of schedule) {
      const video = videoRecords.find((v) => v.youtubeId === item.youtubeId);
      if (!video) continue;

      await prisma.scheduledWorkout.upsert({
        where: {
          userId_videoId_scheduledDate: {
            userId,
            videoId: video.id,
            scheduledDate: getDate(item.offset),
          },
        },
        update: {
          isCompleted: item.completed,
          completedAt: item.completed ? new Date() : null,
        },
        create: {
          userId,
          videoId: video.id,
          scheduledDate: getDate(item.offset),
          isCompleted: item.completed,
          completedAt: item.completed ? new Date() : null,
        },
      });
    }
  };

  await scheduleForUser(user.id);
  await scheduleForUser(regularUser.id);

  await prisma.chatMessage.createMany({
    data: [
      {
        userId: user.id,
        role: "user",
        content: "Help me plan workouts around a busy week.",
      },
      {
        userId: user.id,
        role: "assistant",
        content:
          "I can schedule three 30-minute sessions focusing on full-body, abs, and arms with your available equipment.",
      },
    ],
  });

  await prisma.ingestionEvent.createMany({
    data: videoRecords.slice(0, 6).map((video, index) => ({
      youtubeId: video.youtubeId,
      analyzerUsed: index % 2 === 0 ? "rules" : "llm",
      qualityScore: video.qualityScore ?? 75,
      missingFields: index % 3 === 0 ? ["coachTone"] : [],
      errorMessage: null,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
