import { useState } from "react";
import { useNavigate } from "react-router";
import { getRandomMeal } from "../services/mealApi";

type Status = "idle" | "loading" | "error";

export function useRandomMeal() {
  // navigate permet d'ouvrir une autre page depuis cette fonction.
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");

  async function surprise() {
    // On ignore les clics supplémentaires pendant le chargement.
    if (status === "loading") return;
    setStatus("loading");

    try {
      // On attend la recette avant d'ouvrir sa page.
      const meal = await getRandomMeal();
      if (!meal) {
        setStatus("error");
        return;
      }
      navigate(`/recette/${meal.idMeal}`);
    } catch {
      setStatus("error");
    }
  }

  return { status, surprise, reset: () => setStatus("idle") };
}
