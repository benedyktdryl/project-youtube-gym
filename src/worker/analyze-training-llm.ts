import type { TrainingAnalysis } from "./analyze-training";

type LLMOptions = {
  model?: string;
};

const DEFAULT_MODEL = "gpt-4o-mini";

function clampScore(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

function normalizeIntensity(value: unknown): TrainingAnalysis["intensity"] {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }
  return "medium";
}

function normalizeNullableString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

type RawTrainingAnalysis = Partial<{
  trainingType: unknown;
  intensity: unknown;
  equipmentNeeded: unknown;
  muscleGroups: unknown;
  trainingTags: unknown;
  coachTone: unknown;
  qualityScore: unknown;
  safetyNotes: unknown;
}>;

function normalizeTrainingAnalysis(raw: unknown): TrainingAnalysis {
  const data =
    typeof raw === "object" && raw !== null
      ? (raw as RawTrainingAnalysis)
      : ({} as RawTrainingAnalysis);
  return {
    trainingType: normalizeNullableString(data.trainingType),
    intensity: normalizeIntensity(data.intensity),
    equipmentNeeded: toStringArray(data.equipmentNeeded),
    muscleGroups: toStringArray(data.muscleGroups),
    trainingTags: toStringArray(data.trainingTags),
    coachTone: normalizeNullableString(data.coachTone),
    qualityScore: clampScore(Number(data.qualityScore ?? 0)),
    safetyNotes: normalizeNullableString(data.safetyNotes),
  };
}

function buildPrompt(text: string) {
  return [
    "You are a fitness content analyst.",
    "Return a JSON object with:",
    "trainingType (string or null),",
    "intensity (low|medium|high),",
    "equipmentNeeded (string[]),",
    "muscleGroups (string[]),",
    "trainingTags (string[]),",
    "coachTone (string or null),",
    "qualityScore (0-100),",
    "safetyNotes (string or null).",
    "Only return JSON.",
    "",
    "Content:",
    text,
  ].join("\n");
}

export async function analyzeTrainingLLM(
  text: string,
  options: LLMOptions = {},
): Promise<TrainingAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for LLM analysis.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model ?? process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
      input: buildPrompt(text),
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const payload = await response.json();
  const outputText = payload?.output?.[0]?.content?.[0]?.text ?? payload?.output_text ?? "";

  let parsed: TrainingAnalysis;
  try {
    parsed = normalizeTrainingAnalysis(JSON.parse(outputText));
  } catch {
    parsed = normalizeTrainingAnalysis({});
  }

  return parsed;
}
