import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";

import { pinia } from "@/lib/pinia";
import { router } from "./lib/router";

import "./assets/index.css";

createApp(App).use(pinia).use(VueQueryPlugin).use(router).mount("#app");
