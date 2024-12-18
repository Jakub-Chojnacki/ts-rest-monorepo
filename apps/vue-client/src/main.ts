import { createMemoryHistory, createRouter } from "vue-router";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";

import "./style.css";

const vuetify = createVuetify({
  components,
  directives,
});

const routes = [{ path: "/", component: HelloWorld }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(vuetify).use(router).mount("#app");
