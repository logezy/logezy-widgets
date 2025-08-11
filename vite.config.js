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
        banner: `;(function() {
      if (typeof window !== 'undefined') {
        if (!window.process) {
          window.process = { env: { NODE_ENV: 'production' } };
        } else if (!window.process.env) {
          window.process.env = { NODE_ENV: 'production' };
        }
      }
    })();`,
      },
    },

  },
});
