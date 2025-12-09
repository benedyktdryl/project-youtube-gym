import { Equipment, MuscleGroup, WorkoutGoal } from './types';

// Available equipment options
export const EQUIPMENT: Equipment[] = [
  { id: 'mat', name: 'Yoga Mat', icon: 'yoga' },
  { id: 'dumbbells', name: 'Dumbbells', icon: 'dumbbell' },
  { id: 'resistance-bands', name: 'Resistance Bands', icon: 'cable' },
  { id: 'kettlebell', name: 'Kettlebell', icon: 'kettlebell' },
  { id: 'pull-up-bar', name: 'Pull-up Bar', icon: 'bar-chart-horizontal' },
  { id: 'bench', name: 'Bench', icon: 'sofa' },
  { id: 'foam-roller', name: 'Foam Roller', icon: 'cylinder' },
  { id: 'jump-rope', name: 'Jump Rope', icon: 'cable-car' },
];

// Muscle groups
export const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: 'abs', name: 'Abs', icon: 'hexagon' },
  { id: 'back', name: 'Back', icon: 'align-vertical-space-around' },
  { id: 'biceps', name: 'Biceps', icon: 'arm' },
  { id: 'chest', name: 'Chest', icon: 'shirt' },
  { id: 'glutes', name: 'Glutes', icon: 'circle' },
  { id: 'hamstrings', name: 'Hamstrings', icon: 'stretching' },
  { id: 'quads', name: 'Quads', icon: 'square' },
  { id: 'shoulders', name: 'Shoulders', icon: 'mountain' },
  { id: 'triceps', name: 'Triceps', icon: 'arm' },
  { id: 'full-body', name: 'Full Body', icon: 'activity' },
  { id: 'cardio', name: 'Cardio', icon: 'heart-pulse' },
];

// Workout goals
export const WORKOUT_GOALS: WorkoutGoal[] = [
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    description: 'Burn calories and reduce body fat',
    icon: 'flame',
  },
  {
    id: 'muscle-gain',
    name: 'Muscle Gain',
    description: 'Build strength and increase muscle mass',
    icon: 'dumbbell',
  },
  {
    id: 'endurance',
    name: 'Endurance',
    description: 'Improve stamina and cardiovascular health',
    icon: 'heart-pulse',
  },
  {
    id: 'flexibility',
    name: 'Flexibility',
    description: 'Enhance mobility and prevent injuries',
    icon: 'stretching',
  },
  {
    id: 'toning',
    name: 'Toning',
    description: 'Define muscles without significant bulk',
    icon: 'hammer',
  },
];

// Days of the week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Chat prompt suggestions
export const CHAT_SUGGESTIONS = [
  "I want to lose weight and tone my arms",
  "I only have dumbbells and a yoga mat",
  "I can workout on Monday, Wednesday, and Friday",
  "My legs are sore from yesterday's workout",
  "I need a 20-minute workout for today",
];