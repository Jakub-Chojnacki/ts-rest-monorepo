import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import SignupPage from "./pages/SignupPage.vue";
import DashboardPage from "./pages/DashboardPage.vue";

import "./assets/index.css";

const routes = [
  { path: "/", component: HomePage, name: "home" },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/signup",
    component: SignupPage,
    name: "signup",
  },
  { path: "/dashboard", component: DashboardPage, name: "dashboard" },
];

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(pinia).use(VueQueryPlugin).use(router).mount("#app");
