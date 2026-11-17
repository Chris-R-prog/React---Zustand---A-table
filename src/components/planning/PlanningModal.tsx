import { useEffect, useRef, useState, type SubmitEvent } from "react";
import type { MealPreview } from "../../types/meal";
import { usePlanRecipe } from "../../hooks/usePlanRecipe";
import "./planningModal.css";

type PlanningModalProps = {
  meal: MealPreview;
  isOpen: boolean;
  onClose: () => void;
};

export default function PlanningModal({
  meal,
  isOpen,
  onClose,
}: PlanningModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedDate, setSelectedDate] = useState("");

  // Le hook gère la récupération de la recette et son enregistrement dans Zustand.
  const { planRecipe, isSaving, error } = usePlanRecipe();

  // Synchronise l'ouverture du dialog avec l'état du composant parent.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDate || isSaving) return;

    const success = await planRecipe(meal, selectedDate);
    if (!success) return;

    setSelectedDate("");
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="planning-modal"
      onClose={onClose}
      aria-labelledby={`modal-title-${meal.idMeal}`}
    >
      <button
        type="button"
        className="modal-close"
        onClick={() => dialogRef.current?.close()}
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
      <form onSubmit={handleSubmit}>
        <label htmlFor={`date-${meal.idMeal}`}>Date de dégustation</label>
        <input
          id={`date-${meal.idMeal}`}
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          required
          disabled={isSaving}
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Enregistrement..." : "Ajouter au planning"}
        </button>
        {error && <p role="alert">{error}</p>}
      </form>
    </dialog>
  );
}
