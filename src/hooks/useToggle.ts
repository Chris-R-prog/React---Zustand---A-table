import { useState } from "react";

// Ce hook évite de réécrire la logique ouvrir/fermer dans chaque composant.
export function useToggle(initialValue = false) {
  // isOpen indique l'état actuel ; setIsOpen permet de le changer.
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  // Pour inverser la valeur, on part de sa valeur précédente.
  const toggle = () => setIsOpen((previous) => !previous);

  return { isOpen, open, close, toggle };
}
