import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  optimizeDeps: {
    include: ["api-contract/**/*"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
     '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
