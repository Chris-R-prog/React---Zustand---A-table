import type { MealPreview } from "../../types/meal";

type Props = {
  meal: MealPreview;
  onClose: () => void;
};

export default function PlanningModalDetails({ meal, onClose }: Props) {
  return (
    <>
      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        aria-label="Fermer"
      >
        ×
      </button>
      <h2 id={`modal-title-${meal.idMeal}`}>Planifier cette recette</h2>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="planning-modal-image"
      />
      <p>{meal.strMeal}</p>
    </>
  );
}
