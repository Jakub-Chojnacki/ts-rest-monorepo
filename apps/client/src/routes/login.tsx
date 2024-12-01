import { createFileRoute, useNavigate } from "@tanstack/react-router";

import useAuth from "@/hooks/useAuth";

import LoginPage from "@/pages/LoginPage";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate({ from: "/login" });
  
  if (isAuthenticated) navigate({ to: "/" });

  return <LoginPage />;
}
