import { useState } from "react";
import type { MealPreview } from "../types/meal";
import { getMealById } from "../services/mealApi";
import { extractIngredients } from "../utils/extractIngredients";
import { useRecipeStore } from "../store/useRecipeStore";
import { selectAddPlannedRecipe } from "../store/planningSlice";
import { selectAddIngredients } from "../store/ingredientsSlice";

export function usePlanRecipe() {
  const addPlannedRecipe = useRecipeStore(selectAddPlannedRecipe);
  const addIngredients = useRecipeStore(selectAddIngredients);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function planRecipe(meal: MealPreview, date: string) {
    setIsSaving(true);
    setError("");

    try {
      // Récupère la recette complète, avec les ingrédients.
      const detail = await getMealById(meal.idMeal);
      if (!detail) throw new Error("Recette introuvable");

      const planningId = crypto.randomUUID();

      // Transforme les ingrédients pour les enregistrer dans Zustand.
      const ingredients = extractIngredients(detail).map((ingredient) => ({
        id: crypto.randomUUID(),
        planningId,
        recipeName: detail.strMeal,
        name: ingredient.name,
        measure: ingredient.measure,
        consumptionDate: date,
      }));

      addPlannedRecipe({
        planningId,
        mealId: detail.idMeal,
        name: detail.strMeal,
        consumptionDate: date,
      });

      addIngredients(ingredients);
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
