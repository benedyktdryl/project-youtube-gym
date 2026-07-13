import { ToolCta } from "@/components/tools/tool-cta";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMemo, useState } from "react";

type Sex = "male" | "female";
type Goal = "lose" | "maintain" | "gain";

const ACTIVITY_LEVELS = [
  { value: "1.2", label: "Brak aktywności (praca siedząca)" },
  { value: "1.375", label: "Lekka aktywność (1–3 treningi/tydz.)" },
  { value: "1.55", label: "Umiarkowana aktywność (3–5 treningów/tydz.)" },
  { value: "1.725", label: "Wysoka aktywność (6–7 treningów/tydz.)" },
  { value: "1.9", label: "Bardzo wysoka (praca fizyczna + treningi)" },
] as const;

const GOALS: { value: Goal; label: string; factor: number; hint: string }[] = [
  { value: "lose", label: "Redukcja", factor: 0.8, hint: "deficyt ok. 20%" },
  { value: "maintain", label: "Utrzymanie", factor: 1, hint: "zero bilans" },
  { value: "gain", label: "Budowa masy", factor: 1.15, hint: "nadwyżka ok. 15%" },
];

export function CaloriesPage() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState<string>("1.375");
  const [goal, setGoal] = useState<Goal>("maintain");

  const result = useMemo(() => {
    const ageY = Number.parseFloat(age);
    const weightKg = Number.parseFloat(weight);
    const heightCm = Number.parseFloat(height);
    const activityFactor = Number.parseFloat(activity);
    if (!ageY || !weightKg || !heightCm || ageY <= 0 || weightKg <= 0 || heightCm <= 0) {
      return null;
    }
    // Mifflin-St Jeor
    const base = 10 * weightKg + 6.25 * heightCm - 5 * ageY;
    const bmr = sex === "male" ? base + 5 : base - 161;
    const tdee = bmr * activityFactor;
    const goalDef = GOALS.find((g) => g.value === goal) ?? GOALS[1];
    const target = tdee * goalDef.factor;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(target),
      goalLabel: goalDef.label,
    };
  }, [sex, age, weight, height, activity, goal]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kalkulator kalorii (TDEE i BMR)
        </h1>
        <p className="text-muted-foreground">
          Oblicz swoje dzienne zapotrzebowanie kaloryczne metodą Mifflina-St Jeora. Poznaj
          podstawową przemianę materii (BMR) oraz całkowite zapotrzebowanie energetyczne (TDEE)
          dopasowane do Twojego celu.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Wprowadź dane</CardTitle>
          <CardDescription>Wszystkie pola są wymagane do obliczeń.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Płeć</Label>
            <RadioGroup
              className="flex gap-6"
              value={sex}
              onValueChange={(value) => setSex(value as Sex)}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem id="sex-male" value="male" />
                <Label htmlFor="sex-male" className="font-normal">
                  Mężczyzna
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="sex-female" value="female" />
                <Label htmlFor="sex-female" className="font-normal">
                  Kobieta
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="age">Wiek (lata)</Label>
              <Input
                id="age"
                type="number"
                inputMode="numeric"
                min="1"
                placeholder="np. 30"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Waga (kg)</Label>
              <Input
                id="weight"
                type="number"
                inputMode="decimal"
                min="1"
                placeholder="np. 70"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Wzrost (cm)</Label>
              <Input
                id="height"
                type="number"
                inputMode="decimal"
                min="1"
                placeholder="np. 175"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Poziom aktywności</Label>
            <select
              id="activity"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
            >
              {ACTIVITY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Cel</Label>
            <RadioGroup
              className="grid gap-2 sm:grid-cols-3"
              value={goal}
              onValueChange={(value) => setGoal(value as Goal)}
            >
              {GOALS.map((g) => (
                <Label
                  key={g.value}
                  htmlFor={`goal-${g.value}`}
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-3 font-normal has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem id={`goal-${g.value}`} value={g.value} />
                  <span>
                    {g.label}
                    <span className="block text-xs text-muted-foreground">{g.hint}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {result ? (
            <div className="grid gap-3 sm:grid-cols-3" aria-live="polite">
              <div className="rounded-lg border bg-muted/40 p-4 text-center">
                <p className="text-xs text-muted-foreground">BMR</p>
                <p className="text-2xl font-bold">{result.bmr}</p>
                <p className="text-xs text-muted-foreground">kcal/dzień</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4 text-center">
                <p className="text-xs text-muted-foreground">TDEE</p>
                <p className="text-2xl font-bold">{result.tdee}</p>
                <p className="text-xs text-muted-foreground">kcal/dzień</p>
              </div>
              <div className="rounded-lg border bg-primary/10 p-4 text-center">
                <p className="text-xs text-muted-foreground">Cel: {result.goalLabel}</p>
                <p className="text-2xl font-bold">{result.target}</p>
                <p className="text-xs text-muted-foreground">kcal/dzień</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Uzupełnij dane, aby zobaczyć zapotrzebowanie kaloryczne.
            </p>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Wyniki są szacunkowe. Rzeczywiste zapotrzebowanie zależy od indywidualnego metabolizmu,
        składu ciała i stylu życia. Monitoruj wagę i koryguj kalorie co 2–3 tygodnie.
      </p>

      <ToolCta />
    </div>
  );
}
