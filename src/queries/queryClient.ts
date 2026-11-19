import { QueryClient } from "@tanstack/react-query";

// Confirmation commune aux requêtes de l'application.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});
