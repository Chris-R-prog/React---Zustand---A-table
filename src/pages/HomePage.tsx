import HeroSection from "../components/home/HeroSection";
import CategorySidebar from "../components/recipes/CategorySidebar";
import RecipeGrid from "../components/recipes/RecipeGrid";
import { useMealExplorer } from "../hooks/useMealExplorer";
import "./home.css";

// C'est Homepage qui appelle le hook useMealExplorer parce que c'est le parent commun à la barre de recherche et à la grid qui affiche les recettes, la lien est suffisamment direct pour qu'on ne fasse pas appel à Zustand dans ce cas. On remonte à l'état commun le plus proche.

export default function HomePage() {
  // on affecte le hook useMealExplorer pour la barre de recherche à la const explorer il retourne un objet contenant plusieurs propriétés et fonctions les éléments du useState et la fonction search

  const explorer = useMealExplorer();

  return (
    <main>
      {/* La barre peut afficher et modifier le texte sans posséder elle-même
          le useState. Elle reçoit aussi la fonction de recherche sans l’exécuter. */}
      <HeroSection
        searchQuery={explorer.searchQuery}
        onSearchQueryChange={explorer.setSearchQuery}
        onSearch={explorer.search}
      />
      <section className="recipe-explorer container">
        <CategorySidebar
          selectedCategory={explorer.category}
          onSelectCategory={explorer.selectCategory}
          randomLoading={explorer.randomStatus === "loading"}
        />
        {/*Homepage affiche simplement les recettes via le composant RecipeGrid la logique de traitement est dans les autres composants*/}
        <div className="recipe-results">
          <h2>{explorer.title}</h2>
          {/* Le message ou la grille change selon l'état de la requête. */}
          {explorer.randomStatus === "loading" && (
            <p>Recherche d'une recette surprise...</p>
          )}
          {explorer.randomStatus === "error" && (
            <p>Impossible de trouver une recette surprise.</p>
          )}
          {explorer.randomStatus === "idle" &&
            explorer.status === "loading" && <p>Les recettes arrivent...</p>}
          {explorer.randomStatus === "idle" && explorer.status === "error" && (
            <p>Impossible de charger les recettes.</p>
          )}
          {explorer.randomStatus === "idle" &&
            (explorer.status === "success" || explorer.status === "empty") && (
              <RecipeGrid meals={explorer.meals} />
            )}
        </div>
      </section>
    </main>
  );
}
