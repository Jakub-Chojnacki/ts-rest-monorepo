import { toast } from "vue-sonner";

import apiClient from "@/api-client";

import { queryClient } from "@/lib/vue-query";

const useCancelReservation = () => {
  const mutation = apiClient.reservations.cancel.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["allReservations"]);
    },
    onError: () => {
      toast.error(
        "Wystąpił błąd poczas anulowania rezerwacji. Spróbuj ponownie."
      );
    },
  });

  return mutation;
};

export default useCancelReservation;
