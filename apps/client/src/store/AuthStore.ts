import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  //This entire store will be refactored when refresh tokens are added
  const accessToken = useLocalStorage<string>("access_token", "");
  const userId = useLocalStorage<string>("userId", "");

  const authHeader = ref(
    accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}
  );

  const handleLogin = ({
    access_token: token,
    userId: passedUserId,
  }: {
    access_token: string;
    userId: string;
  }): void => {
    accessToken.value = token;
    userId.value = passedUserId;
  };

  const handleLogout = (): void => {
    accessToken.value = "";
    userId.value = "";
  };

  return {
    accessToken,
    authHeader,
    userId,
    handleLogin,
    handleLogout,
  };
});
