import HeroSection from "../components/home/HeroSection";
import CategorySidebar from "../components/recipes/CategorySidebar";
import RecipeGrid from "../components/recipes/RecipeGrid";
import { useMealExplorer } from "../hooks/useMealExplorer";
import "./home.css";

export default function HomePage() {
  // Ce hook fournit tout ce dont la page a besoin pour chercher et afficher les recettes.
  const explorer = useMealExplorer();

  return (
    <main>
      {/* La barre reçoit le texte actuel et les fonctions pour lancer une recherche. */}
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
        <div className="recipe-results">
          <h2>{explorer.title}</h2>
          {/* Le message ou la grille change selon l'état de la requête. */}
          {explorer.randomStatus === "loading" && <p>Recherche d'une recette surprise...</p>}
          {explorer.randomStatus === "error" && <p>Impossible de trouver une recette surprise.</p>}
          {explorer.randomStatus === "idle" && explorer.status === "loading" && <p>Les recettes arrivent...</p>}
          {explorer.randomStatus === "idle" && explorer.status === "error" && <p>Impossible de charger les recettes.</p>}
          {explorer.randomStatus === "idle" && (explorer.status === "success" || explorer.status === "empty") && (
            <RecipeGrid meals={explorer.meals} />
          )}
        </div>
      </section>
    </main>
  );
}
