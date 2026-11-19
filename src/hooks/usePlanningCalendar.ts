import { useMemo } from "react";
import { useRecipeStore } from "../store/useRecipeStore";
import {
  selectMovePlannedRecipe,
  selectPlannedRecipes,
  selectRemovePlannedRecipe,
} from "../store/planningSlice";

type ClickInfo = { event: { id: string; title: string } };
type DropInfo = {
  event: { id: string; startStr: string };
  revert: () => void;
};

// On récupère les recettes planifiées dans Zustand on les transforme au format FullCalendar et gère la suppression et le déplacement des recettes
export function usePlanningCalendar() {
  //On récupère deux fonctions et une donnée via les sélecteurs du store
  const recipes = useRecipeStore(selectPlannedRecipes);
  const removeRecipe = useRecipeStore(selectRemovePlannedRecipe);
  const moveRecipe = useRecipeStore(selectMovePlannedRecipe);

  // FullCalendar attend les noms id, title et start. On utilise UseMemo pour mémoriser un résultat calculé
  const events = useMemo(
    () =>
      // on utilise map parce que les éléments zustand et fullCalendar n'ont pas les mêmes structures
      recipes.map((recipe) => ({
        id: recipe.planningId,
        title: recipe.name,
        start: recipe.consumptionDate,
        allDay: true,
      })),
    [recipes],
  );

  function handleEventClick(info: ClickInfo) {
    const confirmed = window.confirm(
      `Supprimer « ${info.event.title} » du planning ?`,
    );
    if (confirmed) removeRecipe(info.event.id);
  }

  function handleEventDrop(info: DropInfo) {
    const newDate = info.event.startStr.slice(0, 10);
    if (!newDate) return info.revert();
    moveRecipe(info.event.id, newDate);
  }

  return { events, handleEventClick, handleEventDrop };
}
