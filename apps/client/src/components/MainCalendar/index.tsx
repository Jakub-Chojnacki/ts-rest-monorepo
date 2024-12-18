import "react-big-calendar/lib/css/react-big-calendar.css";

import { useMemo, useState } from "react";
import { Calendar } from "react-big-calendar";
import { toast } from "sonner";

import apiClient from "@/api-client";
import useAuth from "@/hooks/useAuth";

import { type EventType } from "api-contract";
import { queryClient } from "@/main";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { messages } from "./const";
import { eventPropGetter, formats, localizer } from "./utils";
import getReadableDate from "@/utils/getReadableDate";

const MainCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const { authHeader, userId } = useAuth();

  const { data,  } = apiClient.events.getMany.useQuery(["allEvents"], {
    extraHeaders: authHeader,
  });

  const { mutate } = apiClient.reservations.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
      toast("Udało się utworzyć rezerwację!");
      handleCloseDialog();
    },
  });

  const modifiedData = useMemo(
    () =>
      data?.body.map((event) => {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        };
      }),
    [data]
  );

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

  const handleSelectEvent = (event: EventType) => {
    const { isBooked } = event;

    if (isBooked) {
      return toast("Ten termin jest już zajęty!");
    }

    handleOpenDialog();
    setSelectedEvent(event);
  };

  const handleOpenDialog = () => setIsOpen(true);

  const handleMakeReservation = () => {
    if (!userId || !selectedEvent) return;

    mutate({
      body: {
        eventId: selectedEvent.id,
        isCancelled: false,
        userId,
      },
      extraHeaders: authHeader,
    });
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedEvent(null), 500); //to prevent flickering
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
        events={modifiedData || []}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleSelectEvent}
        culture="pl"
        formats={formats}
        messages={messages}
      />
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Czy na pewno chcesz zarezerwować ten termin?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="">
              {selectedEvent && (
                <div>
                  <p>Trening personalny</p>
                  <p>Start: {getReadableDate(selectedEvent.start)}</p>
                  <p>Koniec: {getReadableDate(selectedEvent.end)}</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={handleMakeReservation}>
                Zarezerwuj
              </Button>
              <Button onClick={handleCloseDialog}>Anuluj</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainCalendar;
