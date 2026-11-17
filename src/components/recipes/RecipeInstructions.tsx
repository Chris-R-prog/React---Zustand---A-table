// Les instructions peuvent être absentes dans la réponse de l'API.
type RecipeInstructionsProps = {
  instructions: string | null;
};

export default function RecipeInstructions({
  instructions,
}: RecipeInstructionsProps) {
  // On s'arrête ici si aucune instruction n'est disponible.
  if (!instructions) {
    return <p>Les instructions ne sont pas disponibles.</p>;
  }

  // On sépare les lignes, on les nettoie, puis on retire les lignes vides.
  const steps = instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <section className="recipe-instructions">
      <h2>La préparation</h2>

      <div className="instructions-content">
        {steps.map((step, index) => (
          <p key={index}>{step}</p>
        ))}
      </div>
    </section>
  );
}
