//Gerstionnaire des requêtes
import { QueryClient } from "@tanstack/react-query";

// Confirmation commune aux requêtes de l'application. On crée une instance de la classe de tanstack
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      // le remontage d'un composant peut provoquer une nouvelle requête avant les 5mn
    },
  },
});
