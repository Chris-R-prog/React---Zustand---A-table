import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { RecipeStore } from "./RecipeStore";

// Première partie du store : le planning.
import { createPlanningSlice } from "./planningSlice";

// Deuxième partie du store : les ingrédients.
import { createIngredientsSlice } from "./ingredientsSlice";

// Ce hook permet à tous les composants d'utiliser le même store.
export const useRecipeStore = create<RecipeStore>()(
  // devtools permet de voir les changements du store dans Redux DevTools.
  devtools(
    (...args) => ({
      // Chaque fonction crée sa partie du store. Les spreads les réunissent.
      ...createPlanningSlice(...args),
      ...createIngredientsSlice(...args),
    }),
    { name: "A table - Planning" },
  ),
);
