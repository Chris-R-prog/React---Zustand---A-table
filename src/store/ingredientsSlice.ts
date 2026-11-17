import type { StateCreator } from "zustand";
import type { RecipeStore } from "./RecipeStore";

export interface PlannedIngredient {
  id: string;
  planningId: string;
  recipeName: string;
  name: string;
  measure: string;
  consumptionDate: string;
}

export interface IngredientSlice {
  ingredients: PlannedIngredient[];
  addIngredients: (items: PlannedIngredient[]) => void;

  updateIngredient: (
    id: string,
    // autoriser la modification de measure, munsumptionDate ou les deux
    changes: Partial<Pick<PlannedIngredient, "measure" | "consumptionDate">>,
  ) => void;

  removeIngredient: (id: string) => void;
}

// Cette fonction doit créer uniquement la partie ingrédients du store.
export const createIngredientsSlice: StateCreator<
  RecipeStore,
  [["zustand/devtools", never]],
  [],
  IngredientSlice
> = (set) => ({
  ingredients: [],

  // On garde les anciens ingrédients et on ajoute tous les nouveaux à la fin.
  addIngredients: (items) =>
    set((state) => ({
      ingredients: [...state.ingredients, ...items],
    })),

  // Modifie uniquement l'ingrédient dont l'identifiant correspond.
  updateIngredient: (id, changes) =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, ...changes } : ingredient,
      ),
    })),

  // Crée un tableau sans l'ingrédient supprimé.
  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== id,
      ),
    })),
});

// Sélecteurs : lecture des données et récupération des actions
export const selectIngredients = (state: IngredientSlice) => state.ingredients;

export const selectAddIngredients = (state: IngredientSlice) =>
  state.addIngredients;

export const selectUpdateIngredient = (state: IngredientSlice) =>
  state.updateIngredient;

export const selectRemoveIngredient = (state: IngredientSlice) =>
  state.removeIngredient;
