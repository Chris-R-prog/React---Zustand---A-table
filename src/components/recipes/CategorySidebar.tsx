import { categories } from "../../data/categories";
import "./categorySidebar.css";

// Le parent indique la catégorie choisie et fournit la fonction pour la changer.
type CategorySidebarProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  randomLoading: boolean;
};

export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
  randomLoading,
}: CategorySidebarProps) {
  return (
    <aside className="category-sidebar">
      <h2>Inspiration thématique</h2>

      <div className="category-list">
        {/* On crée un bouton pour chaque catégorie. La catégorie est envoyée
            au parent seulement au clic. icon devient Icon pour être utilisé
            comme un composant. */}
        {categories.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            type="button"
            className={`category-option ${
              selectedCategory === value ? "active" : ""
            }`}
            onClick={() => onSelectCategory(value)}
            aria-pressed={selectedCategory === value}
            aria-busy={value === "random" && randomLoading}
            disabled={value === "random" && randomLoading}
          >
            <span className="category-icon">
              <Icon size={22} strokeWidth={1.8} />
            </span>

            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
