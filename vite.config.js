import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    target: "es2018",
    minify: "esbuild",
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
