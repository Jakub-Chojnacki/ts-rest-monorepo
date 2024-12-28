import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/store/AuthStore";

import apiClient from "@/api-client";

import { queryClient } from "@/lib/vue-query";

const useEditTiming = () => {
  const { userId } = storeToRefs(useAuthStore());

  const mutation = apiClient.schedules.editTiming.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules", userId.value]);
      toast.success("Wybrany grafik został edytowany!");
    },
    onError: () => {
      toast.error("Wystąpił błąd poczas edycji grafiku. Spróbuj ponownie.");
    },
  });

  return mutation;
};

export default useEditTiming;
