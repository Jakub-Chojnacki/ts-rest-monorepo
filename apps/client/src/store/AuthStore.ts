import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, watch } from "vue";
import { router } from "@/lib/router";

export const useAuthStore = defineStore("auth", () => {
  //This entire store will be refactored when refresh tokens are added
  const accessToken = useLocalStorage<string>("access_token", "");
  const userId = useLocalStorage<string>("userId", "");

  const authHeader = ref(
    accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}
  );

  watch(accessToken, () => {
    authHeader.value = { Authorization: `Bearer ${accessToken.value}` };
  });

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
    router.push("/login");
  };

  return {
    accessToken,
    authHeader,
    userId,
    handleLogin,
    handleLogout,
  };
});
