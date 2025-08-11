import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  build: {
    target: "es2018",
    minify: "esbuild",
    esbuild: {
      pure: ['process.env.NODE_ENV'],
    },
    lib: {
      entry: "src/main.js",
      name: "LogezyWidgets",
      formats: ["iife", "esm"],
      fileName: (format) => format === "iife" ? "widgets.min.js" : `widgets.${format}.js`,
    },
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: undefined,
      },
    },
  },
});
