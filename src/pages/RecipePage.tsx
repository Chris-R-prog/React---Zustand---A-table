import { useParams } from "react-router";
import RecipeDetail from "../components/recipes/RecipeDetail";
import { useMealDetail } from "../hooks/useMealDetail";
import "./recipePage.css";

export default function RecipePage() {
  // useParams récupère l'id placé dans l'adresse /recette/:id.
  const { id } = useParams();
  // Ce hook charge la recette correspondant à cet id.
  const { meal, status } = useMealDetail(id);

  return (
    <main className="container">
      {/* Chaque élément s'affiche seulement quand sa condition est vraie. */}
      {status === "loading" && <p>Chargement de la recette...</p>}
      {status === "error" && <p>Impossible de récupérer cette recette.</p>}
      {meal && <RecipeDetail meal={meal} />}
    </main>
  );
}
