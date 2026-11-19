import {
  LayoutGrid,
  Leaf,
  Soup,
  CakeSlice,
  Fish,
  Coffee,
  CookingPot,
  Drumstick,
  Beef,
  Sparkles,
} from "lucide-react";

// le label est la valeur d'affichage et value la valeur de travail permettant d'identifier la catégorie
export const categories = [
  { label: "Tout découvrir", value: "", icon: LayoutGrid },
  { label: "Surprenez-moi", value: "random", icon: Sparkles },
  { label: "Végétarien", value: "Vegetarian", icon: Leaf },
  { label: "Entrées", value: "Starter", icon: Soup },
  { label: "Desserts", value: "Dessert", icon: CakeSlice },
  { label: "Poissons", value: "Seafood", icon: Fish },
  { label: "Petit-déjeuner", value: "Breakfast", icon: Coffee },
  { label: "Pâtes", value: "Pasta", icon: CookingPot },
  { label: "Poulet", value: "Chicken", icon: Drumstick },
  { label: "Bœuf", value: "Beef", icon: Beef },
];
