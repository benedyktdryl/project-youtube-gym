import { ChatMessage, ChatSession, User, UserPreferences, WorkoutDay, WorkoutVideo } from './types';

// Mock user
export const MOCK_USER: User = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

// Mock user preferences
export const MOCK_PREFERENCES: UserPreferences = {
  userId: '1',
  goal: 'weight-loss',
  availableEquipment: ['mat', 'dumbbells', 'resistance-bands'],
  preferredDays: ['Monday', 'Wednesday', 'Friday'],
  preferredDuration: 30,
  preferredIntensity: 'medium',
};

// Mock workout videos
export const MOCK_VIDEOS: WorkoutVideo[] = [
  {
    id: '1',
    title: '30 Min Full Body HIIT Workout',
    youtubeId: 'ml6cT4AZdqI',
    channelName: 'MadFit',
    channelThumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj',
    duration: 1800,
    thumbnailUrl: 'https://i.ytimg.com/vi/ml6cT4AZdqI/maxresdefault.jpg',
    equipmentNeeded: ['mat'],
    muscleGroups: ['full-body', 'cardio'],
    intensity: 'high',
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
      {
        name: 'Push-ups',
        startTime: 240,
        endTime: 270,
        muscleGroup: 'chest',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: '2',
    title: '20 Min Arm Workout with Dumbbells',
    youtubeId: 'UyTR2EjTAXU',
    channelName: 'Pamela Reif',
    channelThumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKaXBBAlwy4iuLJVzgYHDtlTnUmV4XwO5u_P7qKZKA=s176-c-k-c0x00ffffff-no-rj',
    duration: 1200,
    thumbnailUrl: 'https://i.ytimg.com/vi/UyTR2EjTAXU/maxresdefault.jpg',
    equipmentNeeded: ['dumbbells'],
    muscleGroups: ['biceps', 'triceps', 'shoulders'],
    intensity: 'medium',
    exercises: [
      {
        name: 'Bicep Curls',
        startTime: 90,
        endTime: 120,
        muscleGroup: 'biceps',
        difficulty: 'beginner',
      },
      {
        name: 'Overhead Press',
        startTime: 180,
        endTime: 210,
        muscleGroup: 'shoulders',
        difficulty: 'intermediate',
      },
      {
        name: 'Tricep Extensions',
        startTime: 300,
        endTime: 330,
        muscleGroup: 'triceps',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: '3',
    title: '15 Min Abs Workout',
    youtubeId: 'AnYl6Nk9GOA',
    channelName: 'Chloe Ting',
    channelThumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKb3JO87LkWT5LPLJXzs_2mOcfINB7B42yNY5arSIQ=s176-c-k-c0x00ffffff-no-rj',
    duration: 900,
    thumbnailUrl: 'https://i.ytimg.com/vi/AnYl6Nk9GOA/maxresdefault.jpg',
    equipmentNeeded: ['mat'],
    muscleGroups: ['abs'],
    intensity: 'medium',
    exercises: [
      {
        name: 'Crunches',
        startTime: 60,
        endTime: 90,
        muscleGroup: 'abs',
        difficulty: 'beginner',
      },
      {
        name: 'Plank',
        startTime: 150,
        endTime: 180,
        muscleGroup: 'abs',
        difficulty: 'intermediate',
      },
      {
        name: 'Russian Twists',
        startTime: 240,
        endTime: 270,
        muscleGroup: 'abs',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: '4',
    title: '30 Min Lower Body Workout',
    youtubeId: 'X0r-OOKb-qw',
    channelName: 'MadFit',
    channelThumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj',
    duration: 1800,
    thumbnailUrl: 'https://i.ytimg.com/vi/X0r-OOKb-qw/maxresdefault.jpg',
    equipmentNeeded: ['mat', 'dumbbells'],
    muscleGroups: ['quads', 'hamstrings', 'glutes'],
    intensity: 'high',
    exercises: [
      {
        name: 'Squats',
        startTime: 120,
        endTime: 150,
        muscleGroup: 'quads',
        difficulty: 'beginner',
      },
      {
        name: 'Lunges',
        startTime: 210,
        endTime: 240,
        muscleGroup: 'quads',
        difficulty: 'intermediate',
      },
      {
        name: 'Deadlifts',
        startTime: 300,
        endTime: 330,
        muscleGroup: 'hamstrings',
        difficulty: 'intermediate',
      },
    ],
  },
];

// Mock workout days
export const MOCK_WORKOUT_WEEK: WorkoutDay[] = [
  {
    id: '1',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)), // Monday
    videos: [MOCK_VIDEOS[0]],
    isCompleted: true,
  },
  {
    id: '2',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 2)), // Tuesday
    videos: [],
    isCompleted: false,
  },
  {
    id: '3',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 3)), // Wednesday
    videos: [MOCK_VIDEOS[2]],
    isCompleted: false,
  },
  {
    id: '4',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 4)), // Thursday
    videos: [],
    isCompleted: false,
  },
  {
    id: '5',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 5)), // Friday
    videos: [MOCK_VIDEOS[1], MOCK_VIDEOS[3]],
    isCompleted: false,
  },
  {
    id: '6',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6)), // Saturday
    videos: [],
    isCompleted: false,
  },
  {
    id: '7',
    date: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7)), // Sunday
    videos: [],
    isCompleted: false,
  },
];

// Mock chat messages
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi there! I\'m your TrainFlow assistant. I\'ll help you create a personalized workout plan based on your goals, available equipment, and schedule. What are your fitness goals?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: '2',
    role: 'user',
    content: 'I want to lose weight and tone my muscles.',
    timestamp: new Date(Date.now() - 1000 * 60 * 9),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Great goal! What equipment do you have available for your workouts?',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: '4',
    role: 'user',
    content: 'I have a yoga mat, dumbbells, and resistance bands.',
    timestamp: new Date(Date.now() - 1000 * 60 * 7),
  },
  {
    id: '5',
    role: 'assistant',
    content: 'Perfect! Which days of the week are you available to workout?',
    timestamp: new Date(Date.now() - 1000 * 60 * 6),
  },
  {
    id: '6',
    role: 'user',
    content: 'Monday, Wednesday, and Friday.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '7',
    role: 'assistant',
    content: 'Based on your goals and equipment, I recommend a mix of HIIT, strength training, and cardio. I\'ve created a weekly plan for you with workouts on Monday, Wednesday, and Friday. Would you like to see it?',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
];

// Mock chat session
export const MOCK_CHAT_SESSION: ChatSession = {
  id: '1',
  messages: MOCK_CHAT_MESSAGES,
  createdAt: new Date(Date.now() - 1000 * 60 * 10),
  updatedAt: new Date(Date.now() - 1000 * 60 * 4),
};