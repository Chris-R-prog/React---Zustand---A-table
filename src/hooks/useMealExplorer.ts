import { useState } from "react";
import { categories } from "../data/categories";
import { categoryAliases } from "../data/searchAliases";
import { useMeals } from "./useMeals";
import { useRandomMeal } from "./useRandomMeal";

// Ce hook rassemble toute la logique de recherche de la page d'accueil.
export function useMealExplorer() {
  // searchQuery change pendant la saisie ; searchTerm change après validation.
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { meals, status } = useMeals(category, searchTerm);
  const randomMeal = useRandomMeal();
  // On cherche les informations de la catégorie sélectionnée.
  const selected = categories.find((item) => item.value === category);
  const title = searchTerm
    ? `Résultats pour « ${searchTerm} »`
    : category
      ? selected?.label
      : "À découvrir dans votre assiette";

  function search(query: string) {
    const normalizedQuery = query.trim();
    // Certains mots français sont convertis en catégorie comprise par l'API.
    const matchingCategory = categoryAliases[normalizedQuery.toLowerCase()];
    setSearchQuery(normalizedQuery);
    randomMeal.reset();

    if (matchingCategory) {
      setCategory(matchingCategory);
      setSearchTerm("");
      return;
    }
    setCategory("");
    setSearchTerm(normalizedQuery);
  }

  function selectCategory(value: string) {
    if (value === "random") {
      // La recherche surprise démarre ; cette fonction n'a pas besoin de son résultat direct.
      void randomMeal.surprise();
      return;
    }
    setCategory(value);
    setSearchQuery("");
    setSearchTerm("");
    randomMeal.reset();
  }

  // La page recevra toutes ces valeurs et fonctions en utilisant ce hook.
  return {
    category, searchQuery, setSearchQuery, search, selectCategory,
    meals, status, title,
    randomStatus: randomMeal.status,
  };
}
