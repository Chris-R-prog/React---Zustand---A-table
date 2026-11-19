import { test, expect, beforeAll, afterEach, afterAll } from "vitest";

import { server } from "../mocks/server";

import { getMealsByCategory, searchMeals } from "../../services/mealApi";

// Démarrer MSW avant les tests
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));

// Réinitialiser les handlers après chaque test
afterEach(() => server.resetHandlers());

// Arrêter MSW après les tests
afterAll(() => server.close());

//TEST 1
test("récupère deux recettes de pâtes", async () => {
  const meals = await getMealsByCategory("Pasta");

  console.log("Recettes reçues :", meals);
  console.log("Nombre de recettes :", meals.length);

  expect(meals).toHaveLength(2);
  expect(meals[0].strMeal).toBe("Spaghetti");
});

// TEST 2
test("retourne un tableau vide si aucune recette n'est trouvée", async () => {
  const meals = await searchMeals("recette-introuvable");

  expect(meals).toEqual([]);
});
