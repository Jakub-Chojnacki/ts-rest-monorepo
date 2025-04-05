import { storeToRefs } from "pinia";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useAuthMe = () => {
  const { authHeader, userId } = storeToRefs(useAuthStore());

  const query = apiClient.auth.useQuery(
    ["user", userId.value],
    () => ({
      extraHeaders: authHeader.value || {},
    }),
    { enabled: !!authHeader.value }
  );

  return query;
};

export default useAuthMe;
