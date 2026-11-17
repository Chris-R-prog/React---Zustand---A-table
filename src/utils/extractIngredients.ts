import type { MealDetail } from "../types/meal";

// Transforme les 20 champs numérotés de TheMealDB en tableau d'objets
// L'API peut fournir jusqu'à 20 ingrédients numérotés de 1 à 20.
export function extractIngredients(meal: MealDetail) {
  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;

    return {
      name: meal[`strIngredient${number}`]?.trim() ?? "",
      measure: meal[`strMeasure${number}`]?.trim() ?? "",
    };
    // On retire les emplacements laissés vides par l'API.
  }).filter((ingredient) => ingredient.name);
}
