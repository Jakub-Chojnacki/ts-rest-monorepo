import { createFileRoute, useNavigate } from "@tanstack/react-router";

import useAuth from "@/hooks/useAuth";

import SignupPage from "@/pages/SignupPage";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate({ from: "/login" });
  
  if (isAuthenticated) navigate({ to: "/" });

  return <SignupPage />;
}
