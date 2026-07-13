import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

export function ToolCta() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-lg font-semibold">Gotowy na realny trening?</p>
          <p className="text-sm text-muted-foreground">
            Dołącz do TrainFlow i dobierz treningi wideo dopasowane do Twoich celów.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/register">Załóż darmowe konto</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/videos">Przeglądaj treningi</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
