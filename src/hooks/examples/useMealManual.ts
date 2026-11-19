import { useEffect, useState } from "react";
import type { MealPreview } from "../../types/meal";

import {
  getFeaturedMeals,
  getMealsByCategory,
  searchMeals,
} from "../../services/mealApi";
type Status = "loading" | "success" | "empty" | "error";
type Result = {
  key: string;
  meals: MealPreview[];
  status: Exclude<Status, "loading">;
};

export function useMeals(category: string, searchTerm: string) {
  // Cette clé permet de reconnaître la recherche qui a produit un résultat.
  const requestKey = JSON.stringify([category, searchTerm]);
  const [result, setResult] = useState<Result | null>(null);

  // La requête est relancée lorsque la catégorie ou le texte recherché change.
  useEffect(() => {
    // Il permettra d'annuler une ancienne requête devenue inutile.
    const controller = new AbortController();
    // On choisit l'appel API adapté aux critères actuels.
    const request = searchTerm
      ? searchMeals(searchTerm, controller.signal)
      : category
        ? getMealsByCategory(category, controller.signal)
        : getFeaturedMeals(controller.signal);

    request
      // Quand la réponse arrive, on enregistre les recettes et le nouveau statut.
      .then((meals) => {
        if (controller.signal.aborted) return;
        setResult({
          key: requestKey,
          meals,
          status: meals.length === 0 ? "empty" : "success",
        });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ key: requestKey, meals: [], status: "error" });
        }
      });

    // Si une autre recherche commence, l'ancienne est annulée.
    return () => controller.abort();
  }, [category, searchTerm, requestKey]);

  // Tant que le résultat ne correspond pas à la recherche actuelle, on charge.
  if (result?.key !== requestKey) {
    return { meals: [], status: "loading" as const };
  }
  return { meals: result.meals, status: result.status };
}
