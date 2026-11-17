import { Link } from "react-router";
import type { MealDetail } from "../../types/meal";
import PlanningModal from "../planning/PlanningModal";
import { useToggle } from "../../hooks/useToggle";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

type RecipeDetailProps = { meal: MealDetail };

export default function RecipeDetail({ meal }: RecipeDetailProps) {
  const { isOpen, open, close } = useToggle();

  return (
    <article className="recipe-detail">
      <Link to="/" className="recipe-back">
        ← Retour aux recettes
      </Link>
      <div className="recipe-overview">
        <img
          className="recipe-image"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="recipe-info">
          <p className="recipe-origin">
            {meal.strCategory} • {meal.strArea}
          </p>
          <h1>{meal.strMeal}</h1>
          <button type="button" className="recipe-plan-button" onClick={open}>
            Ajouter au planning
          </button>
          <PlanningModal meal={meal} isOpen={isOpen} onClose={close} />
          <RecipeIngredients meal={meal} />
        </div>
      </div>
      <RecipeInstructions instructions={meal.strInstructions} />
    </article>
  );
}
