import { format } from "date-fns/format";

const getReadableDate = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export default getReadableDate;
