import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import { useAuthStore } from "@/store/AuthStore";
import { pinia } from "@/lib/pinia";

const routes = [
  { path: "/", component: HomePage, name: "home" },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
    meta: {
      requiresNonAuth: true,
    },
  },
  {
    path: "/signup",
    component: SignupPage,
    name: "signup",
    meta: {
      requiresNonAuth: true,
    },
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    name: "dashboard",
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresNonAuth) {
    const userStore = useAuthStore(pinia);

    if (userStore.accessToken) {
      router.push("/dashboard");
    }
  }

  if (to.meta.requiresAuth) {
    const userStore = useAuthStore(pinia);

    if (!userStore.accessToken) {
      router.push("/login");
    }
  }
});
