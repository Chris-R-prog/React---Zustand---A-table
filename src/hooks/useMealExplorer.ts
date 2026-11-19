import { useState } from "react";
import { categories } from "../data/categories";
import { categoryAliases } from "../data/searchAliases";
import { useMeals } from "./useMeals";
import { useRandomMeal } from "./useRandomMeal";

// Ce hook rassemble toute la logique de recherche de la page d'accueil. La searchbar, les catégories et l'appel à une recette surprise.

export function useMealExplorer() {
  // searchQuery change pendant la saisie permet de déclancher des rendus mais ne fait pas appel à l'API ; c'est la modification de searchTerm qui permet à useMeal de faire appel à l'API et demander les données correspondant au nouveau critère. Le setter est appelé après validation via "rechercher"
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //On fait appel au hook useMeals à qui on transmet immédiatement useTerm qu'on a pas besoin de transmettre ensuite dans le return
  const { meals, status } = useMeals(category, searchTerm);

  //On fait appel au hook personnalisé useRandomMeal qui permet de récupérer une recette au hasard et l'appel de useMealExplorer permet d'accéder aux éléments de ce hook qu'il retourne comme aux autres éléments de ce composant. ici useMealExplorer a accès à status surprise et reset et retourne randomstatus: randomMeal.status
  const randomMeal = useRandomMeal();

  // On cherche les informations de la catégorie sélectionnée. On a importé un tableau de valeurs "categories" et find renvoie la première valeur qui correspond. Pour éviter une erreur avec undefined on utilise ? et on revient au titre par défaut de la grid
  const selected = categories.find((item) => item.value === category);
  const title = searchTerm
    ? `Résultats pour « ${searchTerm} »`
    : category
      ? selected?.label
      : "À découvrir dans votre assiette";

  // Fonction de recherche de la search bar
  function search(query: string) {
    const normalizedQuery = query.trim();

    // Certains mots français sont convertis en catégories "comprises" par l'API.
    const matchingCategory = categoryAliases[normalizedQuery.toLowerCase()];

    // On met à jour le paramètre SearchQuery par son setter
    setSearchQuery(normalizedQuery);
    randomMeal.reset();

    // Si le terme de recherche correspond à une catégorie en français, on vide searchTerm et on passe à la recherche par catégorie
    if (matchingCategory) {
      setCategory(matchingCategory);
      setSearchTerm("");
      return;
    }
    // sinon on passe la valeur normalisée à SearchTerm
    setCategory("");
    setSearchTerm(normalizedQuery);
  }

  function selectCategory(value: string) {
    if (value === "random") {
      // La recherche surprise démarre le reste de la recherche est intérompue immédiatement par l'instruction return puisque surprenez-moi est un élément à part de la sidebar
      void randomMeal.surprise();
      return;
    }
    setCategory(value);
    setSearchQuery("");
    setSearchTerm("");
    randomMeal.reset();
  }

  // La home page recevra toutes ces valeurs et fonctions en utilisant ce hook.
  return {
    category,
    searchQuery,
    setSearchQuery,
    search,
    selectCategory,
    meals,
    status,
    title,
    randomStatus: randomMeal.status,
  };
}
