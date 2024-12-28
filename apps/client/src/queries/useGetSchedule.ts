import { storeToRefs } from "pinia";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useGetSchedule = () => {
  const { authHeader, userId } = storeToRefs(useAuthStore());

  const query = apiClient.schedules.findAll.useQuery(
    ["schedules", userId.value],
    () => ({
      extraHeaders: authHeader.value,
      params: {
        userId: userId.value,
      },
    }),
    {
      enabled: !!userId.value && !!authHeader.value,
    }
  );

  return query;
};

export default useGetSchedule;
