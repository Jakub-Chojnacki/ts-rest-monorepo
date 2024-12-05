import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
