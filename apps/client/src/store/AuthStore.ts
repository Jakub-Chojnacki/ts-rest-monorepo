import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";
import { router } from "@/lib/router";
import { toast } from "vue-sonner";
import { useQueryClient } from "@tanstack/vue-query";

export const useAuthStore = defineStore("auth", () => {
  //This entire store will be refactored when refresh tokens are added
  const accessToken = useLocalStorage<string>("access_token", "");
  const userId = useLocalStorage<string>("userId", "");
  const queryClient = useQueryClient();

  const authHeader = computed(() =>
    accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : null
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
    queryClient.invalidateQueries(["user"]);
    caches.delete("api-cache");
    router.push("/login");
    toast.success("Zostałeś pomyślnie wylogowany/a!");
  };

  return {
    accessToken,
    authHeader,
    userId,
    handleLogin,
    handleLogout,
  };
});
