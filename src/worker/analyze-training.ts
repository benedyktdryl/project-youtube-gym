import {
  COACH_TONES,
  EQUIPMENT,
  MUSCLE_GROUPS,
  TRAINING_TAGS,
  TRAINING_TYPES,
  classifyMany,
  classifyOne,
} from "@/lib/taxonomy";

export type TrainingAnalysis = {
  trainingType: string | null;
  intensity: "low" | "medium" | "high";
  equipmentNeeded: string[];
  muscleGroups: string[];
  trainingTags: string[];
  coachTone: string | null;
  qualityScore: number;
  safetyNotes: string | null;
};

function normalize(text: string) {
  return text.toLowerCase();
}

function matchKeywords(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

/**
 * Rule-based training analysis. All categorical outputs come from the
 * canonical taxonomy in `@/lib/taxonomy`, so analyzer output is guaranteed
 * to match the values the browse/filter UI offers.
 */
export function analyzeTraining(text: string): TrainingAnalysis {
  const normalized = normalize(text);

  const trainingType = classifyOne(normalized, TRAINING_TYPES);
  const equipmentNeeded = classifyMany(normalized, EQUIPMENT);
  const muscleGroups = classifyMany(normalized, MUSCLE_GROUPS);
  const coachTone = classifyOne(normalized, COACH_TONES);
  const trainingTags = classifyMany(normalized, TRAINING_TAGS);

  let intensity: TrainingAnalysis["intensity"] = "medium";
  if (matchKeywords(normalized, ["low impact", "gentle", "beginner", "recovery"])) {
    intensity = "low";
  }
  if (matchKeywords(normalized, ["hiit", "advanced", "intense", "burn", "sweat"])) {
    intensity = "high";
  }

  let qualityScore = 50;
  if (matchKeywords(normalized, ["form", "technique", "cues"])) {
    qualityScore += 15;
  }
  if (matchKeywords(normalized, ["warm up", "warm-up"])) {
    qualityScore += 10;
  }
  if (matchKeywords(normalized, ["cool down", "cool-down"])) {
    qualityScore += 5;
  }
  if (matchKeywords(normalized, ["beginner", "all levels"])) {
    qualityScore += 5;
  }
  if (matchKeywords(normalized, ["advanced", "extreme"])) {
    qualityScore -= 5;
  }
  qualityScore = Math.max(0, Math.min(100, qualityScore));

  const safetyNotes = matchKeywords(normalized, ["pain", "injury", "warning"])
    ? "Potential safety caveats mentioned; review required."
    : null;

  return {
    trainingType,
    intensity,
    equipmentNeeded,
    muscleGroups,
    trainingTags,
    coachTone,
    qualityScore,
    safetyNotes,
  };
}
