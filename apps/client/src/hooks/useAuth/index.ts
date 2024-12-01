import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { type TReturnedUser } from "api-contract";

import getSessionStorageItem from "@/utils/getSessionStorageItem";

const useAuth = () => {
  const [token, setToken] = useState(getSessionStorageItem("token"));
  const [userId, setUserId] = useState<TReturnedUser["userId"] | null>(
    getSessionStorageItem("userId")
  );

  const navigate = useNavigate();

  const setAuthData = (
    token: string | null,
    userId: TReturnedUser["userId"] | null
  ): void => {
    if (!token || !userId) return;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);

    navigate({ to: "/" });
  };

  const signOut = (): void => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    setToken(null);
    setUserId(null);

    navigate({ to: "/" });
  };

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    setAuthData,
    token,
    signOut,
    userId,
    authHeader,
    isAuthenticated: !!token && !!userId,
  };
};

export default useAuth;
