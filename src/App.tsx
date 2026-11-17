import { Routes, Route } from "react-router";

import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import PlanningPage from "./pages/PlanningPage";
import ShoppingPage from "./pages/ShoppingPage";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/courses" element={<ShoppingPage />} />

          <Route path="/planning" element={<PlanningPage />} />

          {/* :id sera remplacé par l'identifiant de la recette dans l'adresse. */}
          <Route path="/recette/:id" element={<RecipePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
