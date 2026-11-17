import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import classicThemePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

import { useRecipeStore } from "../../store/useRecipeStore";
import {
  selectPlannedRecipes,
  selectRemovePlannedRecipe,
} from "../../store/planningSlice";

export default function PlanningCalendar() {
  // On récupère les recettes planifiées. Si elles changent, le calendrier se réaffiche.
  const recipes = useRecipeStore(selectPlannedRecipes);

  // Cette fonction du store sert à supprimer la recette planifiée sélectionnée.
  const removePlannedRecipe = useRecipeStore(selectRemovePlannedRecipe);

  // On ne recrée les événements que lorsque la liste des recettes change.
  const events = useMemo(
    () =>
      // FullCalendar attend les noms id, title et start : map adapte nos recettes.
      recipes.map((recipe) => ({
        id: recipe.planningId,
        title: recipe.name,
        start: recipe.consumptionDate,
        allDay: true,
      })),
    [recipes],
  );

  // FullCalendar reçoit le nouveau tableau et met son affichage à jour.
  return (
    <div className="planning-calendar">
      <FullCalendar
        aspectRatio={1.9}
        expandRows={false}
        eventColor="#345747"
        eventContrastColor="#ffffff"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        todayText="Aujourd'hui"
        plugins={[classicThemePlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        firstDay={1}
        events={events}
        eventClick={(info) => {
          const confirmed = window.confirm(
            `Supprimer « ${info.event.title} » du planning ?`,
          );

          if (confirmed) {
            removePlannedRecipe(info.event.id);
          }
        }}
      />
    </div>
  );
}
