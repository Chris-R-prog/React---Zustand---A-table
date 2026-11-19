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

export function usePlanningCalendar() {
  const recipes = useRecipeStore(selectPlannedRecipes);
  const removeRecipe = useRecipeStore(selectRemovePlannedRecipe);
  const moveRecipe = useRecipeStore(selectMovePlannedRecipe);

  // FullCalendar attend les noms id, title et start.
  const events = useMemo(
    () =>
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
