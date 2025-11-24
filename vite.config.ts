import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: false,
    hmr: { overlay: true }
  }
});
