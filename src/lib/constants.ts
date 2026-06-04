import {
  EQUIPMENT as EQUIPMENT_TAXONOMY,
  MUSCLE_GROUPS as MUSCLE_GROUPS_TAXONOMY,
} from "./taxonomy";
import type { Equipment, MuscleGroup, WorkoutGoal } from "./types";

// Equipment + muscle-group filter options are DERIVED from the canonical
// taxonomy (`./taxonomy`) so the ids here always match what the ingestion
// analyzer writes to the DB. Do not hand-maintain a second list — add new
// values to the taxonomy instead.
export const EQUIPMENT: Equipment[] = EQUIPMENT_TAXONOMY.map((e) => ({
  id: e.id,
  name: e.label,
  icon: e.icon ?? "dumbbell",
}));

export const MUSCLE_GROUPS: MuscleGroup[] = MUSCLE_GROUPS_TAXONOMY.map((e) => ({
  id: e.id,
  name: e.label,
  icon: e.icon ?? "activity",
}));

// Workout goals
export const WORKOUT_GOALS: WorkoutGoal[] = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    description: "Burn calories and reduce body fat",
    icon: "flame",
  },
  {
    id: "muscle-gain",
    name: "Muscle Gain",
    description: "Build strength and increase muscle mass",
    icon: "dumbbell",
  },
  {
    id: "endurance",
    name: "Endurance",
    description: "Improve stamina and cardiovascular health",
    icon: "heart-pulse",
  },
  {
    id: "flexibility",
    name: "Flexibility",
    description: "Enhance mobility and prevent injuries",
    icon: "stretching",
  },
  {
    id: "toning",
    name: "Toning",
    description: "Define muscles without significant bulk",
    icon: "hammer",
  },
];

// Days of the week
export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Chat prompt suggestions
export const CHAT_SUGGESTIONS = [
  "I want to lose weight and tone my arms",
  "I only have dumbbells and a yoga mat",
  "I can workout on Monday, Wednesday, and Friday",
  "My legs are sore from yesterday's workout",
  "I need a 20-minute workout for today",
];
