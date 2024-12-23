import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = useLocalStorage<string>("access_token", "");
  const userId = ref<string | null>(null);

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
    userId.value = null;
  };

  return {
    accessToken,
    authHeader,
    userId,
    handleLogin,
    handleLogout,
  };
});
