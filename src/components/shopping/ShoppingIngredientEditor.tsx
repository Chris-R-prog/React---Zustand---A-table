import type { IngredientEditorState } from "../../hooks/useEditableIngredient";

type Props = { editor: IngredientEditorState };

export default function ShoppingIngredientEditor({ editor }: Props) {
  return (
    <div className="shopping-edit">
      <input
        aria-label="Quantité et unité"
        value={editor.measure}
        onChange={(event) => editor.setMeasure(event.target.value)}
      />
      <input
        aria-label="Date de consommation"
        type="date"
        value={editor.date}
        onChange={(event) => editor.setDate(event.target.value)}
      />
      <button
        type="button"
        className="shopping-save-button"
        onClick={editor.save}
        disabled={!editor.measure.trim() || !editor.date}
      >
        Enregistrer
      </button>
      <button
        type="button"
        className="shopping-cancel-button"
        onClick={editor.cancel}
      >
        Annuler
      </button>
    </div>
  );
}
