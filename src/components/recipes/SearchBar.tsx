import type { SubmitEvent } from "react";

// Le parent garde le texte recherché et fournit les fonctions pour le modifier ou le valider.
type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
};

export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(query.trim());
  }

  function handleReset() {
    onQueryChange("");
    onSearch("");
  }

  return (
    <form className="recipe-search" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        placeholder="Rechercher une recette..."
        aria-label="Rechercher une recette"
        value={query}
        // On détecte le changement du Dom react, on récupère la valeur qu'on transmet à la fonction onQueryChange qui est en fait setSearchQuery le setter du useState du hook useMealExplorer passé au Hero
        onChange={(event) => onQueryChange(event.target.value)}
      />

      {query && (
        <button
          type="button"
          className="search-reset"
          onClick={handleReset}
          aria-label="Effacer la recherche"
        >
          X
        </button>
      )}
      <button type="submit">Rechercher</button>
    </form>
  );
}
