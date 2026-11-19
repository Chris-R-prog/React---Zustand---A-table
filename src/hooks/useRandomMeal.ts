// on utilise pas useQuery sur "Surprenez-moi " ici on fait appel à un point d'API particulier fournit par mealAPI

import { useState } from "react";
import { useNavigate } from "react-router";
import { getRandomMeal } from "../services/mealApi";

type Status = "idle" | "loading" | "error";

export function useRandomMeal() {
  // navigate permet d'ouvrir une autre page depuis cette fonction. On peut déclancher la navigation depuis une fonction
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");

  async function surprise() {
    // On ignore les clics supplémentaires pendant le chargement.
    if (status === "loading") return;
    setStatus("loading");

    try {
      // On attend la recette avant d'ouvrir sa page on utilise l'api dédiée de mealAPI
      const meal = await getRandomMeal();
      if (!meal) {
        setStatus("error");
        return;
      }
      // On construit l'url à partie de l'id aléatoire retourné
      navigate(`/recette/${meal.idMeal}`);
    } catch {
      setStatus("error");
    }
  }

  return { status, surprise, reset: () => setStatus("idle") };
}
