/**
 * Canonical training taxonomy — the single source of truth.
 *
 * Both the ingestion analyzer (`src/worker/analyze-training.ts`) and the
 * browse/filter UI (`src/lib/constants.ts`, `video-filters`, videos loader)
 * derive their vocabulary from here. Keeping one list prevents the class of
 * bug where the analyzer emits `legs` but the filter only offers `quads` —
 * so the filter can never match (root cause of the broken filtering).
 *
 * Design choices:
 * - Coarse, text-detectable groups. YouTube descriptions rarely let us
 *   reliably tell biceps from triceps, so we use `arms` / `legs` rather than
 *   fine-grained muscles.
 * - Each entry carries `keywords` the analyzer matches against, plus a
 *   stable `id` (used in the DB + URL filters) and a human `label`.
 * - Unknown analyzer matches fall back to nothing (or `other` for tags);
 *   the analyzer logs misses so the vocabulary can grow deliberately.
 */

export interface TaxonomyEntry {
  readonly id: string;
  readonly label: string;
  readonly keywords: readonly string[];
  /** lucide-react icon name, for UI chips */
  readonly icon?: string;
}

export const INTENSITY_LEVELS = ["low", "medium", "high"] as const;
export type Intensity = (typeof INTENSITY_LEVELS)[number];

export const TRAINING_TYPES: readonly TaxonomyEntry[] = [
  { id: "hiit", label: "HIIT", keywords: ["hiit", "tabata", "interval"], icon: "timer" },
  { id: "cardio", label: "Cardio", keywords: ["cardio", "aerobic"], icon: "heart-pulse" },
  {
    id: "strength",
    label: "Strength",
    keywords: ["strength", "weights", "resistance", "lifting"],
    icon: "dumbbell",
  },
  { id: "yoga", label: "Yoga", keywords: ["yoga", "vinyasa", "yin"], icon: "flower" },
  { id: "pilates", label: "Pilates", keywords: ["pilates"], icon: "activity" },
  {
    id: "mobility",
    label: "Mobility",
    keywords: ["mobility", "stretch", "flexibility"],
    icon: "stretching",
  },
  { id: "core", label: "Core", keywords: ["core workout", "ab workout"], icon: "hexagon" },
  {
    id: "running",
    label: "Running",
    keywords: ["run", "running", "treadmill", "jog"],
    icon: "footprints",
  },
] as const;

export const MUSCLE_GROUPS: readonly TaxonomyEntry[] = [
  {
    id: "full-body",
    label: "Full Body",
    keywords: ["full body", "total body", "whole body"],
    icon: "activity",
  },
  { id: "core", label: "Core", keywords: ["abs", "core", "obliques", "six pack"], icon: "hexagon" },
  {
    id: "arms",
    label: "Arms",
    keywords: ["arms", "biceps", "triceps", "forearms"],
    icon: "dumbbell",
  },
  {
    id: "back",
    label: "Back",
    keywords: ["back", "lats", "rows", "pull"],
    icon: "align-vertical-space-around",
  },
  {
    id: "chest",
    label: "Chest",
    keywords: ["chest", "pecs", "push up", "bench press"],
    icon: "shirt",
  },
  {
    id: "shoulders",
    label: "Shoulders",
    keywords: ["shoulders", "delts", "overhead"],
    icon: "mountain",
  },
  {
    id: "legs",
    label: "Legs",
    keywords: ["legs", "lower body", "quads", "hamstrings", "calves", "squat", "lunge"],
    icon: "footprints",
  },
  { id: "glutes", label: "Glutes", keywords: ["glutes", "booty", "hip thrust"], icon: "circle" },
  { id: "cardio", label: "Cardio", keywords: ["cardio", "conditioning"], icon: "heart-pulse" },
] as const;

export const EQUIPMENT: readonly TaxonomyEntry[] = [
  {
    id: "bodyweight",
    label: "Bodyweight",
    keywords: ["bodyweight", "no equipment", "no-equipment", "equipment free"],
    icon: "user",
  },
  { id: "mat", label: "Yoga Mat", keywords: ["mat", "floor"], icon: "square" },
  { id: "dumbbells", label: "Dumbbells", keywords: ["dumbbell", "dumbbells"], icon: "dumbbell" },
  { id: "kettlebell", label: "Kettlebell", keywords: ["kettlebell"], icon: "bell" },
  {
    id: "resistance-bands",
    label: "Resistance Bands",
    keywords: ["band", "bands", "resistance band"],
    icon: "cable",
  },
  { id: "barbell", label: "Barbell", keywords: ["barbell"], icon: "minus" },
  {
    id: "pull-up-bar",
    label: "Pull-up Bar",
    keywords: ["pull-up bar", "pull up bar", "pullup bar"],
    icon: "bar-chart-horizontal",
  },
  { id: "bench", label: "Bench", keywords: ["bench"], icon: "sofa" },
] as const;

export const TRAINING_TAGS: readonly TaxonomyEntry[] = [
  {
    id: "beginner-friendly",
    label: "Beginner friendly",
    keywords: ["beginner", "all levels", "for beginners"],
  },
  {
    id: "no-equipment",
    label: "No equipment",
    keywords: ["no equipment", "bodyweight", "equipment free"],
  },
  { id: "low-impact", label: "Low impact", keywords: ["low impact", "gentle", "no jumping"] },
  { id: "warm-up", label: "Warm-up", keywords: ["warm up", "warm-up", "warmup"] },
  { id: "cool-down", label: "Cool-down", keywords: ["cool down", "cool-down", "cooldown"] },
] as const;

export const COACH_TONES: readonly TaxonomyEntry[] = [
  {
    id: "motivational",
    label: "Motivational",
    keywords: ["let's go", "push", "you can", "motivation", "crush it"],
  },
  {
    id: "instructional",
    label: "Instructional",
    keywords: ["form", "technique", "cues", "alignment"],
  },
  { id: "calm", label: "Calm", keywords: ["breathe", "relax", "slow", "steady"] },
] as const;

// ---- helpers shared by analyzer + UI ----

/** Valid id sets for fast membership checks / validation of URL filters. */
export const MUSCLE_GROUP_IDS = MUSCLE_GROUPS.map((e) => e.id);
export const EQUIPMENT_IDS = EQUIPMENT.map((e) => e.id);
export const TRAINING_TYPE_IDS = TRAINING_TYPES.map((e) => e.id);
export const TRAINING_TAG_IDS = TRAINING_TAGS.map((e) => e.id);

/** Return the first entry id whose keywords appear in `text`, else null. */
export function classifyOne(text: string, entries: readonly TaxonomyEntry[]): string | null {
  return entries.find((e) => e.keywords.some((k) => text.includes(k)))?.id ?? null;
}

/** Return all entry ids whose keywords appear in `text`. */
export function classifyMany(text: string, entries: readonly TaxonomyEntry[]): string[] {
  return entries.filter((e) => e.keywords.some((k) => text.includes(k))).map((e) => e.id);
}

/** Keep only ids that exist in the canonical list (use for URL-filter validation). */
export function keepValid(ids: string[], validIds: string[]): string[] {
  const set = new Set(validIds);
  return ids.filter((id) => set.has(id));
}
