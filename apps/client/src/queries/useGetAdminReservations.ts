import { storeToRefs } from "pinia";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useGetAdminReservations = () => {
  const { authHeader, userId } = storeToRefs(useAuthStore());

  const query = apiClient.reservations.findAll.useQuery(
    ["allAdminReservations"],
    () => ({
      extraHeaders: authHeader.value,
      params: {
        userId: userId.value,
      },
    })
  );

  return query;
};

export default useGetAdminReservations;
