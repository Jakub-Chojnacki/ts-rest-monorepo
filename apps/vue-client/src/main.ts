import { createMemoryHistory, createRouter } from "vue-router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";

import "./style.css";

const pinia = createPinia();

const routes = [{ path: "/", component: HelloWorld }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(pinia).use(VueQueryPlugin).use(router).mount("#app");
