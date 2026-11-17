import type { StateCreator } from "zustand";
import type { RecipeStore } from "./RecipeStore";

// Voici les informations enregistrées quand une recette est planifiée.
export interface PlannedRecipe {
  planningId: string;
  mealId: string;
  name: string;
  consumptionDate: string;
}

// Cette slice contient les recettes planifiées et les fonctions pour les modifier.
// `void` signifie que ces fonctions ne renvoient rien.
export interface PlanningSlice {
  plannedRecipes: PlannedRecipe[];
  addPlannedRecipe: (recipe: PlannedRecipe) => void;
  removePlannedRecipe: (planningId: string) => void;
}

// StateCreator vérifie que cette fonction crée bien la partie planning du store.
export const createPlanningSlice: StateCreator<
  RecipeStore,
  [["zustand/devtools", never]],
  [],
  PlanningSlice
> = (set) => ({
  plannedRecipes: [],

  // set met à jour le store. Le spread garde les anciennes recettes
  // et ajoute la nouvelle dans un nouveau tableau.
  addPlannedRecipe: (recipe) =>
    set((state) => ({
      plannedRecipes: [...state.plannedRecipes, recipe],
    })),

  // filter crée un nouveau tableau sans la recette qui possède cet identifiant.

  removePlannedRecipe: (planningId) =>
    set((state) => ({
      plannedRecipes: state.plannedRecipes.filter(
        (recipe) => recipe.planningId !== planningId,
      ),
    })),
});

// Ces selectors donnent accès à une partie précise du store.
export const selectPlannedRecipes = (state: PlanningSlice) =>
  state.plannedRecipes;

export const selectAddPlannedRecipe = (state: PlanningSlice) =>
  state.addPlannedRecipe;

export const selectRemovePlannedRecipe = (state: PlanningSlice) =>
  state.removePlannedRecipe;
