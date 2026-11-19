import { useState } from "react";
import { selectIngredients } from "../store/ingredientsSlice";
import { useRecipeStore } from "../store/useRecipeStore";

// Transforme une date locale en chaîne AAAA-MM-JJ.
function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentWeek() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return [toDateKey(monday), toDateKey(sunday)];
}

export function useShoppingIngredients() {
  const ingredients = useRecipeStore(selectIngredients);
  const [showAll, setShowAll] = useState(false);
  const [start, end] = getCurrentWeek();

  // Le filtre affiche soit toute la liste, soit la semaine actuelle.
  const filteredIngredients = showAll
    ? ingredients
    : ingredients.filter(
        (item) =>
          item.consumptionDate >= start && item.consumptionDate <= end,
      );
  const visibleIngredients = [...filteredIngredients].sort((a, b) =>
    a.consumptionDate.localeCompare(b.consumptionDate),
  );

  return {
    visibleIngredients,
    showAll,
    togglePeriod: () => setShowAll((currentValue) => !currentValue),
  };
}
