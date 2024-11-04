import { createLazyFileRoute } from "@tanstack/react-router";
import MainCalendar from "../components/MainCalendar";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 ">
      <MainCalendar />
    </div>
  );
}
