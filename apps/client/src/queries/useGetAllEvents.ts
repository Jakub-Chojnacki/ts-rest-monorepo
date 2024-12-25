import { storeToRefs } from "pinia";

import apiClient from "@/api-client";

import { useAuthStore } from "@/store/AuthStore";

const useGetAllEvents = () => {
  const { authHeader } = storeToRefs(useAuthStore());

  const query = apiClient.events.getMany.useQuery(["allEvents"], () => ({
    extraHeaders: authHeader.value,
  }));

  return query;
};

export default useGetAllEvents;
