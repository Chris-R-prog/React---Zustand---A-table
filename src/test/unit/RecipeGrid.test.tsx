import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import RecipeGrid from "../../components/recipes/RecipeGrid";

test("affiche un message si aucune recette n'est disponible", () => {
  render(<RecipeGrid meals={[]} />);

  expect(
    screen.getByText("Aucune recette trouvée pour le moment."),
  ).toBeInTheDocument();
});
