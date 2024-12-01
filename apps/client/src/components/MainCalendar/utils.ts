import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { pl } from "date-fns/locale";
import { EventType } from "api-contract";

export const locales = {
  pl: pl,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const formats = {
  monthHeaderFormat: (date: Date) => format(date, "LLLL yyyy", { locale: pl }),
};

export const eventPropGetter = (event: EventType) => {
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
