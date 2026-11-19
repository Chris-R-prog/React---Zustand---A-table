import type { PlanningFormState } from "../../hooks/usePlanningModal";

type Props = {
  mealId: string;
  form: PlanningFormState;
};

export default function PlanningForm({ mealId, form }: Props) {
  return (
    <form onSubmit={form.handleSubmit}>
      <label htmlFor={`date-${mealId}`}>Date de dégustation</label>
      <input
        id={`date-${mealId}`}
        type="date"
        value={form.selectedDate}
        onChange={(event) => form.setSelectedDate(event.target.value)}
        required
        disabled={form.isSaving}
      />
      <button type="submit" disabled={form.isSaving}>
        {form.isSaving ? "Enregistrement..." : "Ajouter au planning"}
      </button>
      {form.error && <p role="alert">{form.error}</p>}
    </form>
  );
}
