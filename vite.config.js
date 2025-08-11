import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue({ customElement: true })],

  // Force Vue’s browser prod runtime (no process.env in it)
  resolve: {
    alias: {
      vue: "vue/dist/vue.runtime.esm-browser.prod.js",
    },
  },

  // Still helpful, but the alias above is the key part
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: { "process.env.NODE_ENV": JSON.stringify("production"), global: "globalThis" },
    },
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
      output: {
        manualChunks: undefined,
        // tiny safety net (harmless once alias is in place)
        banner: `;(function(){var w=typeof window!=='undefined'?window:self;
          if(typeof w.process==='undefined')w.process={env:{NODE_ENV:'production'}};
          else if(typeof w.process.env==='undefined')w.process.env={NODE_ENV:'production'};
          if(typeof w.global==='undefined')w.global=w;
        })();`,
      },
    },
  },
});