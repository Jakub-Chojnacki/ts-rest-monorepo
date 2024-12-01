import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const useToken = () => {
  const navigate = useNavigate();
  const getToken = (): string | null => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      return tokenString;
    }

    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token: string): void => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const signOut = (): void => {
    sessionStorage.removeItem("token");
    setToken(null);
    navigate({ to: "/" });
  };

  return {
    setToken: saveToken,
    token,
    signOut,
  };
};

export default useToken;
