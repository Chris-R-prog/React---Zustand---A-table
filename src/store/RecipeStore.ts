import type { IngredientSlice } from "./ingredientsSlice";
import type { PlanningSlice } from "./planningSlice";

// Le store final contient à la fois le planning et la liste des ingrédients.
export type RecipeStore = PlanningSlice & IngredientSlice;
