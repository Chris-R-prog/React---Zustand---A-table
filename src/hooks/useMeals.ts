import { useQuery } from "@tanstack/react-query";
import type { MealPreview } from "../types/meal";

import {
  getFeaturedMeals,
  getMealsByCategory,
  searchMeals,
} from "../services/mealApi";

export function useMeals(category: string, searchTerm: string) {
  // Chaque recherche possède sa propre clé dans le cache
  const queryKey = searchTerm
    ? ["meals", "search", searchTerm]
    : category
      ? ["meals", "category", category]
      : ["meals", "featured"];

  const { data, isPending, isError } = useQuery<MealPreview[]>({
    queryKey,

    // La priorité reste : recherche, catégorie, puis sélection d'accueil.
    queryFn: ({ signal }) =>
      searchTerm
        ? searchMeals(searchTerm, signal)
        : category
          ? getMealsByCategory(category, signal)
          : getFeaturedMeals(signal),
  });

  // On conserve le format attendu par les composants existants.
  if (isPending) return { meals: [], status: "loading" as const };
  if (isError) return { meals: [], status: "error" as const };

  if (!data.length) return { meals: [], status: "empty" as const };

  return { meals: data, status: "success" as const };
}
