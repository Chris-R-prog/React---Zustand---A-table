import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../services/mealApi";

// il ne reçoit pas son identifiant depuis homepage il est appelé dans RecipePage c'est là qu'est le useParam qui permet de récupérer l'Id dans l'url. ? indique que l'id est facultatif
export function useMealDetail(id?: string) {
  const {
    // destructuration avec renommage data devient meal
    data: meal,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["meal", id],

    // TanStack Query fournit un AbortSignal.
    // On le transmet au service API pour permettre
    // l'annulation de la requête si nécessaire.
    queryFn: ({ signal }) =>
      id ? getMealById(id, signal) : Promise.resolve(null),

    //On ne lance pas de requête si aucun identifiant n'est fourni.
    enabled: Boolean(id),
  });

  //On renvoit des élémnents définis suivant les différents états de tanstackQuery
  if (!id) return { meal: null, status: "error" as const }; // erreur la fonction s'arrête immédiatement
  if (isPending) return { meal: null, status: "loading" as const }; // on retourne les valeur utiles à RecipePage ici le statut "loading" tant que la recette n'est pas dispo
  if (isError || !meal) return { meal: null, status: "error" as const }; // pas de réponse de l'API ou recette manquante

  return { meal, status: "success" as const }; //
}
