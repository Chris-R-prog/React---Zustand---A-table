import { useRecipeStore } from "../store/useRecipeStore";
import { selectIngredients } from "../store/ingredientsSlice";
import ShoppingIngredient from "../components/shopping/shoppingIngredient";
import "./shoppingPage.css";

export default function ShoppingPage() {
  // Récupère tous les ingrédients enregistrés dans Zustand.
  const ingredients = useRecipeStore(selectIngredients);

  // On classe les ingrédients par date de consommation.
  const sortedIngredients = [...ingredients].sort((a, b) =>
    a.consumptionDate.localeCompare(b.consumptionDate),
  );

  return (
    <main className="container">
      <h1>Ma liste de courses 🛒</h1>

      {sortedIngredients.length === 0 ? (
        <p>Aucun ingrédient dans votre liste de courses.</p>
      ) : (
        <ul className="shopping-list">
          {sortedIngredients.map((ingredient) => (
            <ShoppingIngredient key={ingredient.id} ingredient={ingredient} />
          ))}
        </ul>
      )}
    </main>
  );
}
