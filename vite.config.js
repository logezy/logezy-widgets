import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue({ customElement: true })],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        "process.env.NODE_ENV": '"production"',
      },
    },
  },
  build: {
    target: "es2018",
    minify: "esbuild",
    cssCodeSplit: false,
    lib: {
      entry: "src/main.js",
      name: "LogezyWidgets",
      formats: ["iife", "esm"],
      fileName: (format) =>
        format === "iife" ? "widgets.min.js" : `widgets.${format}.js`,
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
