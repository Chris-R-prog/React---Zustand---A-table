// c'est le hook métier

import { useState } from "react";
import type { MealPreview } from "../types/meal";
import { getMealById } from "../services/mealApi";
import { extractIngredients } from "../utils/extractIngredients";
import { useRecipeStore } from "../store/useRecipeStore";
import { selectAddPlanningWithIngredients } from "../store/planningSlice";

export function usePlanRecipe() {
  //On récupère la référence à une fonction du store zustand grace à un sélecteur
  const addPlanningWithIngredients = useRecipeStore(
    selectAddPlanningWithIngredients,
  );

  // deux états locaux permettent de gérer l'enregistrement
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // fonction qui reçoit deux paramètres meal: une recette simplifiée de type MealPreview - la date choisie par l'utilisateur. Elle récupère les détails nécessaires à la planification
  async function planRecipe(meal: MealPreview, date: string) {
    setIsSaving(true);
    setError("");

    try {
      // Récupère la recette complète, avec les ingrédients via un autre endpoint de l'api.
      const detail = await getMealById(meal.idMeal);
      if (!detail) throw new Error("Recette introuvable");

      // fonction native de JS qui permet de générer un identifiant unique de type uuid
      const planningId = crypto.randomUUID();

      // Extrait les ingrédients de la recette complète.
      // map() transforme chaque ingrédient en objet compatible avec le store.
      // Chaque ingrédient reçoit un UUID unique.
      // planningId permet de le rattacher à sa recette planifiée.
      const ingredients = extractIngredients(detail).map((ingredient) => ({
        id: crypto.randomUUID(),
        planningId,
        recipeName: detail.strMeal,
        name: ingredient.name,
        measure: ingredient.measure,
        consumptionDate: date,
      }));

      // Enregistre la recette planifiée et ses ingrédients dans le store Zustand en une seule action. C'est ce qui permet de maintenir la cohérence entre les ingrédients des courses et ceux des recettes planifiées.
      addPlanningWithIngredients(
        {
          planningId,
          mealId: detail.idMeal,
          name: detail.strMeal,
          consumptionDate: date,
        },
        ingredients,
      );
      return true;
    } catch {
      setError("Impossible d'enregistrer cette recette.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  return { planRecipe, isSaving, error };
}
// finally s'exécute même si le try et le catch contiennent un return
