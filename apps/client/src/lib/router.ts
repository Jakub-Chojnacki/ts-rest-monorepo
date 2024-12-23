import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";

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

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
