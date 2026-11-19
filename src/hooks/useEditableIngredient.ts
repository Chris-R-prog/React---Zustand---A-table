import { useState } from "react";
import type { PlannedIngredient } from "../store/ingredientsSlice";
import {
  selectRemoveIngredient,
  selectUpdateIngredient,
} from "../store/ingredientsSlice";
import { useRecipeStore } from "../store/useRecipeStore";

export function useEditableIngredient(ingredient: PlannedIngredient) {
  const updateIngredient = useRecipeStore(selectUpdateIngredient);
  const removeIngredient = useRecipeStore(selectRemoveIngredient);
  const [isEditing, setIsEditing] = useState(false);
  const [measure, setMeasure] = useState(ingredient.measure);
  const [date, setDate] = useState(ingredient.consumptionDate);

  function save() {
    if (!measure.trim() || !date) return;
    updateIngredient(ingredient.id, {
      measure: measure.trim(),
      consumptionDate: date,
    });
    setIsEditing(false);
  }

  function cancel() {
    setMeasure(ingredient.measure);
    setDate(ingredient.consumptionDate);
    setIsEditing(false);
  }

  return {
    isEditing,
    measure,
    date,
    setMeasure,
    setDate,
    save,
    cancel,
    startEditing: () => setIsEditing(true),
    remove: () => removeIngredient(ingredient.id),
  };
}

export type IngredientEditorState = ReturnType<typeof useEditableIngredient>;
