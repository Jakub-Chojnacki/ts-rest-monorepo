import { createFileRoute } from "@tanstack/react-router";
import UserReservations from "@/pages/UserReservations";

export const Route = createFileRoute("/user-reservations")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserReservations />;
}
