import 'vue-router'
export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresNonAuth?: boolean;
    requiresAuth?: boolean;
  }
}