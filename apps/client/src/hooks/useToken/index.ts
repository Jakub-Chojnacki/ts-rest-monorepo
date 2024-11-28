import { useState } from "react";

const useToken = () => {
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

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
