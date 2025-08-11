import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": '"production"',
    global: "globalThis",
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
        // Inline banner: creates window.process/env + global before your code runs
        banner: `;(function () {
          var w = typeof window !== 'undefined' ? window : self;
          if (typeof w.process === 'undefined') w.process = { env: { NODE_ENV: 'production' } };
          else if (typeof w.process.env === 'undefined') w.process.env = { NODE_ENV: 'production' };
          if (typeof w.global === 'undefined') w.global = w;
        })();`,
      },
    },
  },
});
