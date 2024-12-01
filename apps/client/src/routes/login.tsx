import { createFileRoute, useNavigate } from "@tanstack/react-router";

import useToken from "@/hooks/useToken";

import LoginPage from "@/pages/LoginPage";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useToken();
  const navigate = useNavigate({ from: "/login" });
  if (token) navigate({ to: "/" });

  return <LoginPage />;
}
