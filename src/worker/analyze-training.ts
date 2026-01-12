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

const TRAINING_TYPES = [
  { type: "hiit", keywords: ["hiit", "tabata", "interval"] },
  { type: "cardio", keywords: ["cardio", "aerobic"] },
  { type: "strength", keywords: ["strength", "weights", "resistance"] },
  { type: "yoga", keywords: ["yoga", "vinyasa", "yin"] },
  { type: "pilates", keywords: ["pilates"] },
  { type: "mobility", keywords: ["mobility", "stretch", "flexibility"] },
  { type: "core", keywords: ["core", "abs"] },
  { type: "running", keywords: ["run", "running", "treadmill"] },
];

const EQUIPMENT = [
  { label: "dumbbells", keywords: ["dumbbell", "dumbbells"] },
  { label: "kettlebell", keywords: ["kettlebell"] },
  { label: "resistance-bands", keywords: ["band", "resistance band"] },
  { label: "mat", keywords: ["mat", "floor"] },
  { label: "bodyweight", keywords: ["bodyweight", "no equipment"] },
  { label: "barbell", keywords: ["barbell"] },
];

const MUSCLE_GROUPS = [
  { label: "full-body", keywords: ["full body", "total body"] },
  { label: "abs", keywords: ["abs", "core"] },
  { label: "glutes", keywords: ["glutes", "booty"] },
  { label: "legs", keywords: ["legs", "lower body", "quads", "hamstrings"] },
  { label: "arms", keywords: ["arms", "biceps", "triceps"] },
  { label: "back", keywords: ["back", "lats"] },
  { label: "shoulders", keywords: ["shoulders", "delts"] },
];

const COACH_TONE = [
  { label: "motivational", keywords: ["let's go", "push", "you can", "motivation"] },
  { label: "instructional", keywords: ["form", "technique", "cues", "alignment"] },
  { label: "calm", keywords: ["breathe", "relax", "slow", "steady"] },
];

function normalize(text: string) {
  return text.toLowerCase();
}

function matchKeywords(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values));
}

export function analyzeTraining(text: string): TrainingAnalysis {
  const normalized = normalize(text);

  const trainingType =
    TRAINING_TYPES.find((entry) => matchKeywords(normalized, entry.keywords))?.type ?? null;

  const equipmentNeeded = uniqueStrings(
    EQUIPMENT.filter((entry) => matchKeywords(normalized, entry.keywords)).map(
      (entry) => entry.label,
    ),
  );

  const muscleGroups = uniqueStrings(
    MUSCLE_GROUPS.filter((entry) => matchKeywords(normalized, entry.keywords)).map(
      (entry) => entry.label,
    ),
  );

  const coachTone =
    COACH_TONE.find((entry) => matchKeywords(normalized, entry.keywords))?.label ?? null;

  let intensity: TrainingAnalysis["intensity"] = "medium";
  if (matchKeywords(normalized, ["low impact", "gentle", "beginner", "recovery"])) {
    intensity = "low";
  }
  if (matchKeywords(normalized, ["hiit", "advanced", "intense", "burn", "sweat"])) {
    intensity = "high";
  }

  const trainingTags = uniqueStrings(
    [
      matchKeywords(normalized, ["beginner", "all levels"]) ? "beginner-friendly" : null,
      matchKeywords(normalized, ["no equipment", "bodyweight"]) ? "no-equipment" : null,
      matchKeywords(normalized, ["low impact", "gentle"]) ? "low-impact" : null,
      matchKeywords(normalized, ["warm up", "warm-up"]) ? "warm-up" : null,
      matchKeywords(normalized, ["cool down", "cool-down"]) ? "cool-down" : null,
    ].filter(Boolean) as string[],
  );

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
