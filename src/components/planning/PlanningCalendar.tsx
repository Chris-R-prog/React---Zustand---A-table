import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import interactionPlugin from "@fullcalendar/react/interaction";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import { usePlanningCalendar } from "../../hooks/usePlanningCalendar";
import "./planningCalendar.css";

export default function PlanningCalendar() {
  const { events, handleEventClick, handleEventDrop } = usePlanningCalendar();

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
        plugins={[classicThemePlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        firstDay={1}
        events={events}
        eventClick={handleEventClick}
        editable
        eventDurationEditable={false}
        eventDrop={handleEventDrop}
      />
    </div>
  );
}
