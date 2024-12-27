import { storeToRefs } from "pinia";
import { ComputedRef } from "vue";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

type TUseGetAdminReservationsProps = {
  isCancelled?: ComputedRef<boolean>;
  isUpcoming?: ComputedRef<boolean>;
};

const useGetAdminReservations = ({
  isCancelled,
  isUpcoming,
}: TUseGetAdminReservationsProps) => {
  const { authHeader } = storeToRefs(useAuthStore());

  const query = apiClient.reservations.findAll.useQuery(
    ["allAdminReservations", { isCancelled }, { isUpcoming }],
    () => ({
      extraHeaders: authHeader.value,
      query: {
        isCancelled: String(isCancelled?.value),
        isUpcoming: String(isUpcoming?.value),
      },
    })
  );

  return query;
};

export default useGetAdminReservations;
