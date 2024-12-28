import { storeToRefs } from "pinia";

import { useAuthStore } from "@/store/AuthStore";

import apiClient from "@/api-client";

import { queryClient } from "@/lib/vue-query";

const useEditSchedule = () => {
  const { userId } = storeToRefs(useAuthStore());

  const mutation = apiClient.schedules.edit.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules", userId.value]);
    },
  });

  return mutation;
};

export default useEditSchedule;
