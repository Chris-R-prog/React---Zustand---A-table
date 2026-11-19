import ShoppingIngredient from "../components/shopping/shoppingIngredient";
import { useShoppingIngredients } from "../hooks/useShoppingIngredients";
import "./shoppingPage.css";

export default function ShoppingPage() {
  const { visibleIngredients, showAll, togglePeriod } =
    useShoppingIngredients();

  return (
    <main className="container">
      <h1>Ma liste de courses 🛒</h1>
      <button
        type="button"
        className="shopping-filter-button"
        aria-pressed={showAll}
        onClick={togglePeriod}
      >
        {showAll ? "📅 Voir cette semaine" : "📋 Voir toutes les dates"}
      </button>

      {visibleIngredients.length === 0 ? (
        <p>Aucun ingrédient pour cette période.</p>
      ) : (
        <ul className="shopping-list">
          {visibleIngredients.map((ingredient) => (
            <ShoppingIngredient key={ingredient.id} ingredient={ingredient} />
          ))}
        </ul>
      )}
    </main>
  );
}
