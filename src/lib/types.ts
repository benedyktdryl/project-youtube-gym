// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Workout related types
export interface Equipment {
  id: string;
  name: string;
  icon: string;
}

export interface MuscleGroup {
  id: string;
  name: string;
  icon: string;
}

export interface WorkoutGoal {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface WorkoutVideo {
  id: string;
  scheduledId?: string;
  title: string;
  youtubeId: string;
  channelName: string;
  channelThumbnail: string;
  duration: number; // in seconds
  thumbnailUrl: string;
  equipmentNeeded: string[];
  muscleGroups: string[];
  intensity: 'low' | 'medium' | 'high';
  exercises: VideoExercise[];
}

export interface VideoExercise {
  name: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  muscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkoutDay {
  id: string;
  date: Date;
  videos: WorkoutVideo[];
  isCompleted: boolean;
}

export type SerializedWorkoutDay = Omit<WorkoutDay, 'date'> & { date: string };

export interface UserPreferences {
  userId: string;
  goal: string;
  availableEquipment: string[];
  preferredDays: string[];
  preferredDuration: number; // in minutes
  preferredIntensity: 'low' | 'medium' | 'high';
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
