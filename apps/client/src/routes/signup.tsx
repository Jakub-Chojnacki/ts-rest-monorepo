import { createFileRoute, useNavigate } from "@tanstack/react-router";

import useToken from "@/hooks/useToken";

import SignupPage from "@/pages/SignupPage";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useToken();
  const navigate = useNavigate({ from: "/login" });
  if (token) navigate({ to: "/" });

  return <SignupPage />;
}
