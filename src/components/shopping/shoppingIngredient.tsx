import type { PlannedIngredient } from "../../store/ingredientsSlice";
import { useEditableIngredient } from "../../hooks/useEditableIngredient";
import ShoppingIngredientEditor from "./ShoppingIngredientEditor";

type Props = { ingredient: PlannedIngredient };

export default function ShoppingIngredient({ ingredient }: Props) {
  const editor = useEditableIngredient(ingredient);

  return (
    <li className="shopping-item">
      <div className="shopping-item-header">
        <h3>{ingredient.name}</h3>
        <button
          type="button"
          className="shopping-delete-button"
          onClick={editor.remove}
          aria-label={`Supprimer ${ingredient.name} de la liste de courses`}
        >
          Supprimer
        </button>
      </div>
      <p>🍽️ {ingredient.recipeName}</p>
      {editor.isEditing ? (
        <ShoppingIngredientEditor editor={editor} />
      ) : (
        <div className="shopping-info">
          <span>
            {ingredient.measure} — {ingredient.consumptionDate}
          </span>
          <button
            type="button"
            className="shopping-edit-button"
            onClick={editor.startEditing}
          >
            Modifier
          </button>
        </div>
      )}
    </li>
  );
}
