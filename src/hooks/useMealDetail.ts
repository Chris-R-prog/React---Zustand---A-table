import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../services/mealApi";

export function useMealDetail(id?: string) {
  const {
    data: meal,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["meal", id],

    //TanStack Query transmet un signal pour annuler la requête si nécessaire.
    queryFn: ({ signal }) =>
      id ? getMealById(id, signal) : Promise.resolve(null),

    //On ne lance pas de requête si aucun identifiant n'est fourni.
    enabled: Boolean(id),
  });

  //On conserve les mêmes valeurs de retour qu'avant.
  if (!id) return { meal: null, status: "error" as const };
  if (isPending) return { meal: null, status: "loading" as const };
  if (isError || !meal) return { meal: null, status: "error" as const };

  return { meal, status: "success" as const };
}
