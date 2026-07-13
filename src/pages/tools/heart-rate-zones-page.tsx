import { ToolCta } from "@/components/tools/tool-cta";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

const ZONES = [
  {
    name: "Strefa 1 — Regeneracja",
    low: 0.5,
    high: 0.6,
    desc: "Rozgrzewka, regeneracja",
    color: "bg-sky-500",
  },
  {
    name: "Strefa 2 — Spalanie tłuszczu",
    low: 0.6,
    high: 0.7,
    desc: "Budowa bazy tlenowej",
    color: "bg-green-500",
  },
  {
    name: "Strefa 3 — Tlenowa",
    low: 0.7,
    high: 0.8,
    desc: "Poprawa wydolności",
    color: "bg-yellow-500",
  },
  {
    name: "Strefa 4 — Beztlenowa",
    low: 0.8,
    high: 0.9,
    desc: "Próg mleczanowy",
    color: "bg-orange-500",
  },
  {
    name: "Strefa 5 — Maksymalna",
    low: 0.9,
    high: 1.0,
    desc: "Wysiłek maksymalny",
    color: "bg-red-500",
  },
] as const;

export function HeartRateZonesPage() {
  const [age, setAge] = useState("");
  const [restingHr, setRestingHr] = useState("");

  const result = useMemo(() => {
    const ageY = Number.parseFloat(age);
    if (!ageY || ageY <= 0 || ageY > 120) return null;
    const hrMax = 220 - ageY;
    const rhr = Number.parseFloat(restingHr);
    const hasRhr = !!rhr && rhr > 0 && rhr < hrMax;
    const hrReserve = hasRhr ? hrMax - rhr : null;

    const zones = ZONES.map((zone) => {
      // %HRmax method
      const maxLow = Math.round(hrMax * zone.low);
      const maxHigh = Math.round(hrMax * zone.high);
      // Karvonen method (uses HR reserve), only when resting HR provided
      const karvonenLow = hrReserve !== null ? Math.round(hrReserve * zone.low + rhr) : null;
      const karvonenHigh = hrReserve !== null ? Math.round(hrReserve * zone.high + rhr) : null;
      return { ...zone, maxLow, maxHigh, karvonenLow, karvonenHigh };
    });

    return { hrMax, hasRhr, zones };
  }, [age, restingHr]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Kalkulator stref tętna</h1>
        <p className="text-muted-foreground">
          Wyznacz swoje strefy tętna treningowego. Kalkulator liczy strefy metodą %HRmax (220 −
          wiek) oraz metodą Karvonena (z uwzględnieniem tętna spoczynkowego), aby precyzyjnie
          dopasować intensywność treningu.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Wprowadź dane</CardTitle>
          <CardDescription>
            Wiek jest wymagany. Podaj tętno spoczynkowe, aby uzyskać dokładniejsze strefy metodą
            Karvonena.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Wiek (lata)</Label>
              <Input
                id="age"
                type="number"
                inputMode="numeric"
                min="1"
                max="120"
                placeholder="np. 30"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resting">Tętno spoczynkowe (opcjonalnie)</Label>
              <Input
                id="resting"
                type="number"
                inputMode="numeric"
                min="1"
                placeholder="np. 60"
                value={restingHr}
                onChange={(event) => setRestingHr(event.target.value)}
              />
            </div>
          </div>

          {result ? (
            <div className="space-y-3" aria-live="polite">
              <div className="rounded-lg border bg-muted/40 p-4 text-center">
                <p className="text-sm text-muted-foreground">Tętno maksymalne (HRmax)</p>
                <p className="text-3xl font-bold">{result.hrMax} ud./min</p>
              </div>
              <p className="text-sm font-medium">
                {result.hasRhr
                  ? "Strefy wg metody Karvonena (z tętnem spoczynkowym):"
                  : "Strefy wg metody %HRmax:"}
              </p>
              <ul className="space-y-2">
                {result.zones.map((zone) => {
                  const low = result.hasRhr ? zone.karvonenLow : zone.maxLow;
                  const high = result.hasRhr ? zone.karvonenHigh : zone.maxHigh;
                  return (
                    <li key={zone.name} className="flex items-center gap-3 rounded-md border p-3">
                      <span
                        className={`h-3 w-3 shrink-0 rounded-full ${zone.color}`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{zone.name}</p>
                        <p className="text-xs text-muted-foreground">{zone.desc}</p>
                      </div>
                      <span className="shrink-0 font-mono text-sm font-semibold">
                        {low}–{high}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {result.hasRhr && (
                <p className="text-xs text-muted-foreground">
                  Wskazówka: bez tętna spoczynkowego strefy liczone są prostszą metodą %HRmax.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Podaj wiek, aby zobaczyć strefy tętna.
            </p>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Wzór 220 − wiek jest przybliżeniem. Tętno maksymalne najlepiej zmierzyć w teście wysiłkowym.
        W razie chorób serca skonsultuj plan treningowy z lekarzem.
      </p>

      <ToolCta />
    </div>
  );
}
