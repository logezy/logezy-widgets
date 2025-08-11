import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    target: "es2018",
    minify: "esbuild",
    lib: {
      entry: "src/main.js",
      name: "LogezyWidgets",
      formats: ["iife", "esm"],
      fileName: (f) => (f === "iife" ? "widgets.min.js" : `widgets.${f}.js`),
    },
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: undefined,
        banner: `;(function(){var w=typeof window!=='undefined'?window:self;
          if(typeof w.process==='undefined')w.process={env:{NODE_ENV:'production'}};
          else if(typeof w.process.env==='undefined')w.process.env={NODE_ENV:'production'};
          if(typeof w.global==='undefined')w.global=w;
        })();`,
      },
    },
  },
});
