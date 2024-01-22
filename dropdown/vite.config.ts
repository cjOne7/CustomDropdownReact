import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
// eslint-disable-next-line no-restricted-syntax
export default defineConfig({
  plugins: [react(), svgr()],
});
