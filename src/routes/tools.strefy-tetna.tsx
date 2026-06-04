import { HeartRateZonesPage } from "@/pages/tools/heart-rate-zones-page";
import type { MetaFunction } from "react-router";

export async function loader() {
  return null;
}

export const meta: MetaFunction = () => {
  const title = "Kalkulator stref tętna — Karvonen i %HRmax | TrainFlow";
  const description =
    "Darmowy kalkulator stref tętna treningowego. Wyznacz 5 stref tętna metodą Karvonena (tętno spoczynkowe) oraz %HRmax (220 − wiek) i trenuj z odpowiednią intensywnością.";
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

export default HeartRateZonesPage;
