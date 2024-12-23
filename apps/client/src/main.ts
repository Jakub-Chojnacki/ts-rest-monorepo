import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";

import { pinia } from "@/lib/pinia";
import { router } from "@/lib/router";
import { queryClient } from "@/lib/vue-query";

import "./assets/index.css";

createApp(App)
  .use(pinia)
  .use(VueQueryPlugin, { queryClient })
  .use(router)
  .mount("#app");
