import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { TReservationCardProps } from "./types";
import getReadableDate from "@/utils/getReadableDate";

const ReservationCard = ({ event }: TReservationCardProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span>{getReadableDate(event.start)}</span>
        <span>{getReadableDate(event.end)}</span>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="outline">Przełóż rezerwację</Button>
        <Button>Anuluj</Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
