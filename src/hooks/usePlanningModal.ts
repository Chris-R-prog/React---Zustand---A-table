import { useEffect, useRef, useState, type SubmitEvent } from "react";
import type { MealPreview } from "../types/meal";
import { usePlanRecipe } from "./usePlanRecipe";

// le hook reçoit meal la recette à planifier et is open qui indique si la modale doit-être ouverte
export function usePlanningModal(meal: MealPreview, isOpen: boolean) {
  // On consrtve une référence à un élément du DOM sans déclancher de nouveau rendu
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [selectedDate, setSelectedDate] = useState("");
  // Le hook métier récupère la recette et l'enregistre dans Zustand.
  const { planRecipe, isSaving, error } = usePlanRecipe();

  // useToggle gère l'état isOpen dans le composant parent
  // UseEffect synchronise cet état avec <dialog>. Lorsque isOpen change, on appelle showModal ou close pour ouvrir ou fermer réellement la fenêtre dans le navigateur.
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
