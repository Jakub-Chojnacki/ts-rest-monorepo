import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = useLocalStorage<string>("access_token", "");

  const authHeader = ref(
    accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}
  );

  const handleLogin = (token: string): void => {
    accessToken.value = token;
  };

  const handleLogout = (): void => {
    accessToken.value = "";
  };

  return {
    accessToken,
    authHeader,
    handleLogin,
    handleLogout,
  };
});
