import type { MealPreview } from "../../types/meal";
import { usePlanningModal } from "../../hooks/usePlanningModal";
import PlanningForm from "./PlanningForm";
import PlanningModalDetails from "./PlanningModalDetails";
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
  const { dialogRef, closeDialog, form } = usePlanningModal(meal, isOpen);

  return (
    <dialog
      ref={dialogRef}
      className="planning-modal"
      onClose={onClose}
      aria-labelledby={`modal-title-${meal.idMeal}`}
    >
      <PlanningModalDetails meal={meal} onClose={closeDialog} />
      <PlanningForm mealId={meal.idMeal} form={form} />
    </dialog>
  );
}
