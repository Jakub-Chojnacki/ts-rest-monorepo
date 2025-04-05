import { defineConfig, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    //There seems to be a with vite plugins so we need to assert type as PluginOption
    vue() as PluginOption,
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Rezerwacja treningów personalnych",
        short_name: "Trener",
        description: "Prosta aplikacja do rezerwacji treningów personalnych",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api");
            },
            handler: "StaleWhileRevalidate" as const,
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }) as PluginOption,
  ],
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
    proxy: {
      "/api": {
        target: "http://localhost:3000", //TODO: Change for prod and store in env
        changeOrigin: true,
      },
    },
  },
});
