import { toast } from "vue-sonner";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useLogin = () => {
  const { handleLogin } = useAuthStore();

  const mutation = apiClient.login.useMutation({
    onSuccess: ({ body }) => {
      toast.success(
        "Udało się zalogować. Zostaniesz przeniesiony/a do ekranu głównego!"
      );
      handleLogin(body);
    },
    onError: () => {
      toast.error("Wystąpił błąd podczas logowania!");
    },
  });

  return mutation;
};

export default useLogin;
