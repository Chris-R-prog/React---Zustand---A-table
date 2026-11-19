import { useEffect, useState } from "react";
import { getMealById } from "../../services/mealApi";
import type { MealDetail } from "../../types/meal";

// Le statut ne peut avoir que l'une de ces trois valeurs.
type Status = "loading" | "success" | "error";
type Result = { id: string; meal: MealDetail | null; status: Status };

export function useMealDetail(id?: string) {
  // On garde l'id avec le résultat pour savoir à quelle recette il appartient.
  const [result, setResult] = useState<Result | null>(null);

  // Une nouvelle requête est lancée chaque fois que l'id de l'URL change.
  useEffect(() => {
    if (!id) return;
    // Ce contrôleur pourra annuler la requête si on change de page entre-temps.
    const controller = new AbortController();

    getMealById(id, controller.signal)
      .then((meal) => {
        if (controller.signal.aborted) return;
        setResult({ id, meal, status: meal ? "success" : "error" });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ id, meal: null, status: "error" });
        }
      });

    // On annule l'ancienne requête quand l'id change ou quand la page disparaît.
    return () => controller.abort();
  }, [id]);

  if (!id) return { meal: null, status: "error" as const };
  // Un résultat pour un autre id ne doit pas être affiché sur la page actuelle.
  if (result?.id !== id) return { meal: null, status: "loading" as const };
  return { meal: result.meal, status: result.status };
}
