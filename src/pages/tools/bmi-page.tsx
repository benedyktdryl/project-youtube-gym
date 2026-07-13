import { ToolCta } from "@/components/tools/tool-cta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

type BmiCategory = {
  label: string;
  range: string;
  className: string;
};

const BMI_CATEGORIES: BmiCategory[] = [
  { label: "Niedowaga", range: "poniżej 18,5", className: "text-blue-600 dark:text-blue-400" },
  {
    label: "Waga prawidłowa",
    range: "18,5 – 24,9",
    className: "text-green-600 dark:text-green-400",
  },
  { label: "Nadwaga", range: "25,0 – 29,9", className: "text-amber-600 dark:text-amber-400" },
  { label: "Otyłość", range: "30,0 i więcej", className: "text-red-600 dark:text-red-400" },
];

function categorize(bmi: number): BmiCategory {
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  return BMI_CATEGORIES[3];
}

export function BmiPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const result = useMemo(() => {
    const weightKg = Number.parseFloat(weight);
    const heightCm = Number.parseFloat(height);
    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return null;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    if (!Number.isFinite(bmi)) return null;
    return { bmi, category: categorize(bmi) };
  }, [weight, height]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Kalkulator BMI</h1>
        <p className="text-muted-foreground">
          Oblicz swój wskaźnik masy ciała (BMI) na podstawie wagi i wzrostu. To prosty wskaźnik,
          który pomaga ocenić, czy Twoja masa ciała mieści się w zdrowym zakresie.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Wprowadź dane</CardTitle>
          <CardDescription>Podaj wagę w kilogramach i wzrost w centymetrach.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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

          {result ? (
            <div className="rounded-lg border bg-muted/40 p-4 text-center" aria-live="polite">
              <p className="text-sm text-muted-foreground">Twoje BMI</p>
              <p className="text-4xl font-bold">{result.bmi.toFixed(1)}</p>
              <p className={`mt-1 font-semibold ${result.category.className}`}>
                {result.category.label}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Uzupełnij wagę i wzrost, aby zobaczyć wynik.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zakresy BMI</CardTitle>
          <CardDescription>Według klasyfikacji WHO dla osób dorosłych.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {BMI_CATEGORIES.map((category) => (
              <li key={category.label} className="flex items-center justify-between py-2">
                <span className={`font-medium ${category.className}`}>{category.label}</span>
                <span className="text-sm text-muted-foreground">{category.range}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            BMI to wskaźnik orientacyjny — nie uwzględnia udziału tkanki mięśniowej ani budowy
            ciała. W razie wątpliwości skonsultuj się z lekarzem.
          </p>
        </CardContent>
      </Card>

      <ToolCta />
    </div>
  );
}
