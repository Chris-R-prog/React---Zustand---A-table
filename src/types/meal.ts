// Les informations minimales nécessaires pour afficher une recette dans une liste.
export type MealPreview = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

// Une recette détaillée reprend l'aperçu et ajoute ses autres informations.
export interface MealDetail extends MealPreview {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  // L'API utilise des noms comme strIngredient1, strIngredient2, etc.
  // Cette ligne autorise ces propriétés dont le nom change avec le numéro.
  [key: string]: string | null;
}
