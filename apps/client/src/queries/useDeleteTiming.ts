import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/store/AuthStore";

import apiClient from "@/api-client";

import { queryClient } from "@/lib/vue-query";

const useDeleteTiming = () => {
  const { userId } = storeToRefs(useAuthStore());

  const mutation = apiClient.schedules.deleteTiming.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules", userId.value]);
      toast.success("Wybrany grafik został usunięty!");
    },
    onError: () => {
      toast.error("Wystąpił błąd poczas usuwania grafiku. Spróbuj ponownie.");
    },
  });

  return mutation;
};

export default useDeleteTiming;
