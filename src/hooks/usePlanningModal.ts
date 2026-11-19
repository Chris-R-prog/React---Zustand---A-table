import { useEffect, useRef, useState, type SubmitEvent } from "react";
import type { MealPreview } from "../types/meal";
import { usePlanRecipe } from "./usePlanRecipe";

export function usePlanningModal(meal: MealPreview, isOpen: boolean) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedDate, setSelectedDate] = useState("");
  // Le hook métier récupère la recette et l'enregistre dans Zustand.
  const { planRecipe, isSaving, error } = usePlanRecipe();

  // Synchronise le dialog natif avec l'état du composant parent.
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

  const closeDialog = () => dialogRef.current?.close();
  return {
    dialogRef,
    closeDialog,
    form: {
      selectedDate,
      setSelectedDate,
      isSaving,
      error,
      handleSubmit,
    },
  };
}

export type PlanningFormState = ReturnType<typeof usePlanningModal>["form"];
