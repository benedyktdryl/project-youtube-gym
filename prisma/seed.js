import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Demo123!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@trainflow.com' },
    update: {},
    create: {
      email: 'demo@trainflow.com',
      passwordHash,
      name: 'Demo User',
      avatarUrl:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  });

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      goal: 'muscle-gain',
      preferredDuration: 30,
      preferredIntensity: 'medium',
      availableEquipment: ['mat', 'dumbbells', 'resistance-bands'],
      preferredDays: ['monday', 'wednesday', 'friday', 'saturday'],
    },
  });

  const videos = [
    {
      youtubeId: 'ml6cT4AZdqI',
      title: '30 Min Full Body HIIT Workout',
      channelName: 'MadFit',
      channelThumbnail:
        'https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj',
      thumbnailUrl: 'https://i.ytimg.com/vi/ml6cT4AZdqI/maxresdefault.jpg',
      duration: 1800,
      intensity: 'high',
      muscleGroups: ['full-body', 'cardio'],
      equipmentNeeded: ['mat'],
      exercises: [
        {
          name: 'Jumping Jacks',
          startTime: 120,
          endTime: 150,
          muscleGroup: 'cardio',
          difficulty: 'beginner',
        },
        {
          name: 'Squats',
          startTime: 180,
          endTime: 210,
          muscleGroup: 'quads',
          difficulty: 'beginner',
        },
      ],
    },
    {
      youtubeId: 'UyTR2EjTAXU',
      title: '20 Min Arm Workout with Dumbbells',
      channelName: 'Pamela Reif',
      channelThumbnail:
        'https://yt3.googleusercontent.com/ytc/APkrFKaXBBAlwy4iuLJVzgYHDtlTnUmV4XwO5u_P7qKZKA=s176-c-k-c0x00ffffff-no-rj',
      thumbnailUrl: 'https://i.ytimg.com/vi/UyTR2EjTAXU/maxresdefault.jpg',
      duration: 1200,
      intensity: 'medium',
      muscleGroups: ['biceps', 'triceps', 'shoulders'],
      equipmentNeeded: ['dumbbells'],
      exercises: [
        {
          name: 'Bicep Curls',
          startTime: 90,
          endTime: 120,
          muscleGroup: 'biceps',
          difficulty: 'beginner',
        },
      ],
    },
    {
      youtubeId: 'AnYl6Nk9GOA',
      title: '15 Min Abs Workout',
      channelName: 'Chloe Ting',
      channelThumbnail:
        'https://yt3.googleusercontent.com/ytc/APkrFKb3JO87LkWT5LPLJXzs_2mOcfINB7B42yNY5arSIQ=s176-c-k-c0x00ffffff-no-rj',
      thumbnailUrl: 'https://i.ytimg.com/vi/AnYl6Nk9GOA/maxresdefault.jpg',
      duration: 900,
      intensity: 'medium',
      muscleGroups: ['abs'],
      equipmentNeeded: ['mat'],
      exercises: [
        {
          name: 'Plank',
          startTime: 150,
          endTime: 180,
          muscleGroup: 'abs',
          difficulty: 'intermediate',
        },
      ],
    },
  ];

  const videoRecords = await Promise.all(
    videos.map((video) =>
      prisma.workoutVideo.upsert({
        where: { youtubeId: video.youtubeId },
        update: {},
        create: video,
      })
    )
  );

  const getDate = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const schedule = [
    { youtubeId: 'ml6cT4AZdqI', offset: -2, completed: true },
    { youtubeId: 'AnYl6Nk9GOA', offset: 0, completed: false },
    { youtubeId: 'UyTR2EjTAXU', offset: 2, completed: false },
  ];

  for (const item of schedule) {
    const video = videoRecords.find((v) => v.youtubeId === item.youtubeId);
    if (!video) continue;

    await prisma.scheduledWorkout.upsert({
      where: {
        userId_videoId_scheduledDate: {
          userId: user.id,
          videoId: video.id,
          scheduledDate: getDate(item.offset),
        },
      },
      update: {
        isCompleted: item.completed,
        completedAt: item.completed ? new Date() : null,
      },
      create: {
        userId: user.id,
        videoId: video.id,
        scheduledDate: getDate(item.offset),
        isCompleted: item.completed,
        completedAt: item.completed ? new Date() : null,
      },
    });
  }

  await prisma.chatMessage.createMany({
    data: [
      {
        userId: user.id,
        role: 'user',
        content: 'Help me plan workouts around a busy week.',
      },
      {
        userId: user.id,
        role: 'assistant',
        content:
          'I can schedule three 30-minute sessions focusing on full-body, abs, and arms with your available equipment.',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
