import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // @ts-ignore: There is a problem with current version of vue plugin
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
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
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000", //TODO: Change for prod and store in env
        changeOrigin: true,
      },
    },
  },
});
