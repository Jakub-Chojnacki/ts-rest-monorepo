import { createRouter, createWebHistory } from "vue-router";
import { pinia } from "@/lib/pinia";

import { useAuthStore } from "@/store/AuthStore";

import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import ReservationsPage from "@/pages/ReservationsPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import AdminSchedule from "@/components/adminPanel/AdminSchedule.vue";
import AdminReservations from "@/components/adminPanel/AdminReservations.vue";

const routes = [
  {
    path: "/",
    redirect: () => {
      return { path: "/dashboard" };
    },
  },
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
  {
    path: "/reservations",
    component: ReservationsPage,
    name: "reservations",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin-dashboard",
    component: AdminPage,
    name: "admin-dashboard",
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "reservations",
        component: AdminReservations,
        name: "admin-reservations",
      },
      {
        path: "schedule",
        component: AdminSchedule,
        name: "admin-schedule",
      },
    ],
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
