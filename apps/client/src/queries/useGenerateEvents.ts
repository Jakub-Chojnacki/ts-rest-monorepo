import { toast } from "vue-sonner";

import apiClient from "@/api-client";

import { queryClient } from "@/lib/vue-query";

const useGenerateEvents = () => {
  const mutation = apiClient.schedules.generateEvents.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["allReservations"]);
      toast.success("Terminy zostały wygenerowane!");
    },
    onError: () => {
      toast.error(
        "Wystąpił błąd poczas generowanie terminów. Spróbuj ponownie."
      );
    },
  });

  return mutation;
};

export default useGenerateEvents;
