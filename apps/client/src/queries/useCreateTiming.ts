import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/store/AuthStore";

import apiClient from "@/api-client";

import { queryClient } from "@/lib/vue-query";

const useCreateTiming = () => {
  const { userId } = storeToRefs(useAuthStore());

  const mutation = apiClient.schedules.createTiming.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules", userId.value]);
      toast.success("Grafik został dodany!");
    },
    onError: () => {
      toast.error("Wystąpił błąd poczas dodawania grafiku. Spróbuj ponownie.");
    },
  });

  return mutation;
};

export default useCreateTiming;
