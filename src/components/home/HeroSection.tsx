import SearchBar from "../recipes/SearchBar";
import "./hero.css";

type HeroSectionProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
};

// Ce composant transmet à SearchBar les informations reçues de HomePage. On pourrait intégrer la searchbar au hero mais on ne respecterait pas le principe de responsabilité unique des composant et on passerait au delà des 50 lignes demandées
export default function HeroSection({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>Qu'est-ce qu'on cuisine aujourd'hui ?</h1>

          <p>
            Des idées gourmandes pour tous les jours,
            <br />à découvrir selon vos envies.
          </p>

          <SearchBar
            query={searchQuery}
            onQueryChange={onSearchQueryChange}
            onSearch={onSearch}
          />
        </div>
        <div className="hero-media">
          <img
            src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
            alt="Une inspiration gourmande"
          />
        </div>
      </div>
    </section>
  );
}
