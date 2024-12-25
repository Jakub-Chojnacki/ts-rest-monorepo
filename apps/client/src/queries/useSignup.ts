import { toast } from "vue-sonner";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useSignup = () => {
  const { handleLogin } = useAuthStore();

  const mutation = apiClient.signup.useMutation({
    onSuccess: ({ body }) => {
      toast.success(
        "Udało się zarejestrować. Zostaniesz przeniesiony/a do ekranu głównego!"
      );
      handleLogin({
        access_token: body.access_token,
        userId: body.id,
      });
    },
    onError: () => {
      toast.error("Wystąpił błąd podczas rejestracji!");
    },
  });

  return mutation;
};

export default useSignup;
