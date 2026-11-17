import { useState } from "react";
import type { PlannedIngredient } from "../../store/ingredientsSlice";
import {
  selectUpdateIngredient,
  selectRemoveIngredient,
} from "../../store/ingredientsSlice";
import { useRecipeStore } from "../../store/useRecipeStore";

type Props = { ingredient: PlannedIngredient };

export default function ShoppingIngredient({ ingredient }: Props) {
  const updateIngredient = useRecipeStore(selectUpdateIngredient);
  const removeIngredient = useRecipeStore(selectRemoveIngredient);

  const [isEditing, setIsEditing] = useState(false);
  const [measure, setMeasure] = useState(ingredient.measure);
  const [date, setDate] = useState(ingredient.consumptionDate);

  function save() {
    if (!measure.trim() || !date) return;
    updateIngredient(ingredient.id, {
      measure: measure.trim(),
      consumptionDate: date,
    });
    setIsEditing(false);
  }

  function cancel() {
    setMeasure(ingredient.measure);
    setDate(ingredient.consumptionDate);
    setIsEditing(false);
  }

  return (
    <li className="shopping-item">
      <div className="shopping-item-header">
        <h3>{ingredient.name}</h3>
        <button
          type="button"
          className="shopping-delete-button"
          onClick={() => removeIngredient(ingredient.id)}
          aria-label={`Supprimer ${ingredient.name} de la liste de courses`}
        >
          Supprimer
        </button>
      </div>
      <p>🍽️ {ingredient.recipeName}</p>
      {isEditing ? (
        <div className="shopping-edit">
          <input
            aria-label="Quantité et unité"
            value={measure}
            onChange={(event) => setMeasure(event.target.value)}
          />
          <input
            aria-label="Date de consommation"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <button
            type="button"
            className="shopping-save-button"
            onClick={save}
            disabled={!measure.trim() || !date}
          >
            Enregistrer
          </button>
          <button
            type="button"
            className="shopping-cancel-button"
            onClick={cancel}
          >
            Annuler
          </button>
        </div>
      ) : (
        <div className="shopping-info">
          <span>
            {ingredient.measure} — {ingredient.consumptionDate}
          </span>
          <button
            type="button"
            className="shopping-edit-button"
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </button>
        </div>
      )}
    </li>
  );
}
