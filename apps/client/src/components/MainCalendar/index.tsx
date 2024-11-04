import { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { pl } from "date-fns/locale";

import { messages } from "./const";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  pl: pl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MainCalendar = () => {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        month: true,
        week: true,
        day: true,
      },
    }),
    []
  );

  const events = [
    {
      id: 1,
      title: "Blok treningowy",
      start: new Date(2024, 10, 7, 8),
      end: new Date(2024, 10, 7, 9, 30),
      isBooked: false,
    },
    {
      id: 2,
      title: "Blok treningowy",
      start: new Date(2024, 10, 7, 9, 30),
      end: new Date(2024, 10, 7, 11),
      isBooked: true,
    },
    {
      id: 3,
      title: "Blok treningowy",
      start: new Date(2024, 10, 7, 11),
      end: new Date(2024, 10, 7, 12, 30),
      isBooked: false,
    },
  ];

  const eventPropGetter = (event: (typeof events)[0]) => {
    const style = {
      backgroundColor: event.isBooked ? "red" : "green",
      color: "white",
      borderRadius: "5px",
      border: "none",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const handleSelectEvent = (event: (typeof events)[0]) => {
    console.log("Event clicked:", event);
    alert(`Event: ${event.title}\nBooked: ${event.isBooked ? "Yes" : "No"}`);
  };

  return (
    <div className="flex justify-center h-[500px] px-24">
      <Calendar
        className="w-[100%]"
        localizer={localizer}
        defaultDate={defaultDate}
        views={views}
        startAccessor="start"
        endAccessor="end"
        events={events}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleSelectEvent}
        culture="pl"
        formats={{
          monthHeaderFormat: (date) =>
            format(date, "LLLL yyyy", { locale: pl }),
        }}
        messages={messages}
      />
    </div>
  );
};

export default MainCalendar;
