import type { MealDetail } from "../../types/meal";
import { extractIngredients } from "../../utils/extractIngredients";

type RecipeIngredientsProps = {
  meal: MealDetail;
};
export default function RecipeIngredients({ meal }: RecipeIngredientsProps) {
  // On utilise la fonction qui transforme les ingrédients de utils elle sert aussi pour les courses
  const ingredients = extractIngredients(meal);

  return (
    <section className="recipe-ingredients">
      <h2>Les ingrédients</h2>

      <ul>
        {/* On crée une ligne pour chaque ingrédient trouvé. */}
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <span>{ingredient.name}</span>
            <span>{ingredient.measure}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
