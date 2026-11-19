import { useState } from "react";

// Ce hook personnalisé évite de réécrire la logique ouvrir/fermer dans chaque composant. il sert dans RecipeCard et RecipeDetail.

// On le considère comme fermé au départ
export function useToggle(initialValue = false) {
  // On utilise UseState isOpen indique l'état actuel ; setIsOpen permet de le changer.
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // Pour inverser la valeur, on part de sa valeur précédente.
  const toggle = () => setIsOpen((previous) => !previous);

  // On retourne une valeur et trois fonctions
  return { isOpen, open, close, toggle };
}
