import { format } from "date-fns/format";

const getReadableDate = (date: Date): string => {
  return `${format(date, "dd.MM.yyyy")} - ${format(date, "HH:mm:ss")}`;
};

export default getReadableDate;
