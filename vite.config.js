import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": '"production"', // turn env checks into a string literal
    "process.env": "{}",                     // guard any broader env access
    "process.browser": "true",               // some libs probe this
    global: "window",                        // some libs reference `global`
  },
  build: {
    target: "es2018",
    minify: "esbuild",
    sourcemap: false,
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
