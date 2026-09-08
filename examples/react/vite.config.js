import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const externalRoot = fileURLToPath(new URL("../..", import.meta.url));
const sdkLib = fileURLToPath(new URL("../../lib", import.meta.url));
const shared = fileURLToPath(new URL("../../shared", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@office-sdk", replacement: sdkLib },
      { find: "@office-sdk-shared", replacement: shared },
    ],
  },
  server: {
    port: 5174,
    strictPort: true,
    fs: {
      allow: [externalRoot],
    },
  },
  preview: {
    port: 4174,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
