import { Link } from "react-router";
import type { MealPreview } from "../../types/meal";
import PlanningModal from "../planning/PlanningModal";
import { useToggle } from "../../hooks/useToggle";
import "./recipeCards.css";

type RecipeCardProps = {
  meal: MealPreview;
};

export default function RecipeCard({ meal }: RecipeCardProps) {
  // Chaque carte garde séparément l'état ouvert/fermé de sa modale.
  const { isOpen, open, close } = useToggle();

  return (
    <article className="recipe-card">
      <Link to={`/recette/${meal.idMeal}`} className="recipe-card-link">
        <img
          src={`${meal.strMealThumb}/medium`}
          alt={meal.strMeal}
          loading="lazy"
        />

        <div className="recipe-card-content">
          <h3>{meal.strMeal}</h3>
          <span className="recipe-card-action">Découvrir la recette →</span>
        </div>
      </Link>
      {/* Sans parenthèses, open sera appelée seulement au clic. */}
      <button type="button" className="recipe-card-plan" onClick={open}>
        Ajouter au planning
      </button>
      {/* La modale reçoit la recette et les informations pour s'ouvrir ou se fermer. */}
      <PlanningModal meal={meal} isOpen={isOpen} onClose={close} />
    </article>
  );
}
