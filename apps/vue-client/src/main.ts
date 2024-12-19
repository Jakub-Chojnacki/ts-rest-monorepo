import { createMemoryHistory, createRouter } from "vue-router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";

import "./style.css";
import HomePage from "./pages/HomePage.vue";

const pinia = createPinia();

const routes = [{ path: "/", component: HomePage }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(pinia).use(VueQueryPlugin).use(router).mount("#app");
