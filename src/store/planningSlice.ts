import type { StateCreator } from "zustand";
import type { RecipeStore } from "./RecipeStore";
import type { PlannedIngredient } from "./ingredientsSlice";

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
  addPlanningWithIngredients: (
    recipe: PlannedRecipe,
    ingredients: PlannedIngredient[],
  ) => void;

  addPlannedRecipe: (recipe: PlannedRecipe) => void;
  removePlannedRecipe: (planningId: string) => void;
  movePlannedRecipe: (
    planningId: string,
    consumptionDate: string,
  ) => void;
}

// StateCreator vérifie que cette fonction crée bien la partie planning du store.
export const createPlanningSlice: StateCreator<
  RecipeStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  PlanningSlice
> = (set) => ({
  plannedRecipes: [],

  // Ajoute la recette et ses ingrédients dans une seule mise à jour du store.
  addPlanningWithIngredients: (recipe, ingredients) =>
    set((state) => ({
      plannedRecipes: [...state.plannedRecipes, recipe],
      ingredients: [...state.ingredients, ...ingredients],
    })),

  // set met à jour le store. Le spread garde les anciennes recettes
  // et ajoute la nouvelle dans un nouveau tableau.
  addPlannedRecipe: (recipe) =>
    set((state) => ({
      plannedRecipes: [...state.plannedRecipes, recipe],
    })),

  // Supprime une planification et tous ses ingrédients en une seule opération.
  removePlannedRecipe: (planningId) =>
    set(
      (state) => ({
        plannedRecipes: state.plannedRecipes.filter(
          (recipe) => recipe.planningId !== planningId,
        ),
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.planningId !== planningId,
        ),
      }),
      false,
      "planning/removeWithIngredients",
    ),

  // Déplace une recette et synchronise la date de ses ingrédients.
  // Un seul set() permet de modifier les deux slices ensemble.
  movePlannedRecipe: (planningId, consumptionDate) =>
    set(
      (state) => ({
        plannedRecipes: state.plannedRecipes.map((recipe) =>
          recipe.planningId === planningId
            ? { ...recipe, consumptionDate }
            : recipe,
        ),
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.planningId === planningId
            ? { ...ingredient, consumptionDate }
            : ingredient,
        ),
      }),
      false,
      "planning/moveWithIngredients",
    ),
});

// Ces selectors donnent accès à une partie précise du store.
export const selectPlannedRecipes = (state: PlanningSlice) =>
  state.plannedRecipes;

export const selectAddPlanningWithIngredients = (state: PlanningSlice) =>
  state.addPlanningWithIngredients;

export const selectAddPlannedRecipe = (state: PlanningSlice) =>
  state.addPlannedRecipe;

export const selectRemovePlannedRecipe = (state: PlanningSlice) =>
  state.removePlannedRecipe;

export const selectMovePlannedRecipe = (state: PlanningSlice) =>
  state.movePlannedRecipe;
