import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

const externalRoot = fileURLToPath(new URL("../..", import.meta.url));
const sdkLib = fileURLToPath(new URL("../../lib", import.meta.url));
const shared = fileURLToPath(new URL("../../shared", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@office-sdk": sdkLib,
      "@office-sdk-shared": shared,
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    fs: {
      allow: [externalRoot],
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
