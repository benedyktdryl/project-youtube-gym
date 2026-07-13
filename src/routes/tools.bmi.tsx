import { BmiPage } from "@/pages/tools/bmi-page";
import type { MetaFunction } from "react-router";

export async function loader() {
  return null;
}

export const meta: MetaFunction = () => {
  const title = "Kalkulator BMI — oblicz wskaźnik masy ciała | TrainFlow";
  const description =
    "Darmowy kalkulator BMI. Oblicz wskaźnik masy ciała na podstawie wagi i wzrostu oraz sprawdź, czy mieścisz się w zdrowym zakresie (niedowaga, waga prawidłowa, nadwaga, otyłość).";
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

export default BmiPage;
