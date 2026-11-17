import type { MealPreview } from "../../types/meal";
import RecipeCard from "./RecipeCard";

type RecipeGridProps = {
  // meals est une liste de recettes au format MealPreview.
  meals: MealPreview[];
};

export default function RecipeGrid({ meals }: RecipeGridProps) {
  // S'il n'y a aucune recette, on affiche directement ce message.
  if (meals.length === 0) {
    return <p>Aucune recette trouvée pour le moment.</p>;
  }

  return (
    <div className="recipe-grid">
      {/* On garde les 12 premières recettes, puis on crée une carte pour chacune. */}
      {meals.slice(0, 12).map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
