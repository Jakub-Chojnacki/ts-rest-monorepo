import { storeToRefs } from "pinia";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useGetUserReservations = () => {
  const { authHeader, userId } = storeToRefs(useAuthStore());

  const query = apiClient.reservations.findUserReservations.useQuery(
    ["allReservations"],
    () => ({
      extraHeaders: authHeader.value,
      params: {
        userId: userId.value,
      },
    })
  );

  return query;
};

export default useGetUserReservations;
