import { initQueryClient } from "@ts-rest/vue-query";
import { contract } from "api-contract";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});

export default apiClient;
