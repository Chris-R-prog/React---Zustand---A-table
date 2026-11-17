import type { MealPreview, MealDetail } from "../types/meal";

// L'adresse de l'API vient du fichier .env.local.
const API_URL = import.meta.env.VITE_MEALDB_API_URL;

// T sera remplacé par MealPreview ou MealDetail selon l'appel.
type MealResponse<T> = { meals: T[] | null };

// Cette fonction renvoie toujours une liste du type demandé.
async function fetchMeals<T>(endpoint: string, signal?: AbortSignal): Promise<T[]> {
  // signal permet au hook qui appelle cette fonction d'annuler la requête.
  const response = await fetch(`${API_URL}/${endpoint}`, { signal });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les recettes");
  }

  const data: MealResponse<T> = await response.json();
  // Si l'API renvoie null, on renvoie un tableau vide plus simple à utiliser.
  return data.meals ?? [];
}

export function getMealsByCategory(category: string, signal?: AbortSignal) {
  // On protège la valeur avant de la placer dans l'adresse de la requête.
  return fetchMeals<MealPreview>(`filter.php?c=${encodeURIComponent(category)}`, signal);
}

export function searchMeals(query: string, signal?: AbortSignal) {
  return fetchMeals<MealPreview>(`search.php?s=${encodeURIComponent(query)}`, signal);
}

export async function getFeaturedMeals(signal?: AbortSignal) {
  // Les trois catégories sont chargées en même temps pour aller plus vite.
  const [pasta, seafood, desserts] = await Promise.all([
    getMealsByCategory("Pasta", signal),
    getMealsByCategory("Seafood", signal),
    getMealsByCategory("Dessert", signal),
  ]);
  // On prend quatre recettes de chaque catégorie et on réunit les trois listes.
  return [
    ...pasta.slice(0, 4),
    ...seafood.slice(0, 4),
    ...desserts.slice(0, 4),
  ];
}

export async function getMealById(id: string, signal?: AbortSignal) {
  const meals = await fetchMeals<MealDetail>(
    `lookup.php?i=${encodeURIComponent(id)}`,
    signal,
  );
  // L'API renvoie un tableau, mais un identifiant correspond à une seule recette.
  return meals[0] ?? null;
}

export async function getRandomMeal(signal?: AbortSignal) {
  const meals = await fetchMeals<MealDetail>("random.php", signal);
  return meals[0] ?? null;
}
