import { CaloriesPage } from "@/pages/tools/calories-page";
import type { MetaFunction } from "react-router";

export async function loader() {
  return null;
}

export const meta: MetaFunction = () => {
  const title = "Kalkulator kalorii TDEE i BMR — Mifflin-St Jeor | TrainFlow";
  const description =
    "Darmowy kalkulator kalorii. Oblicz dzienne zapotrzebowanie kaloryczne (TDEE) i podstawową przemianę materii (BMR) metodą Mifflina-St Jeora dla redukcji, utrzymania lub budowy masy.";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
};

export default CaloriesPage;
