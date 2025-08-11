// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

function replaceProcessEnvPlugin() {
  return {
    name: "replace-process-env",
    enforce: "pre",
    apply: "build",
    transform(code, id) {
      if (!/\.m?js$/.test(id)) return null;
      // Hit node_modules (Vue internals) and your code just in case
      if (id.includes("node_modules") || id.endsWith("main.js")) {
        const out = code.replace(/process\.env\.NODE_ENV/g, '"production"');
        return out === code ? null : { code: out, map: null };
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    vue({ customElement: true }),
    replaceProcessEnvPlugin(),  // no extra deps
  ],

  // 🔑 Force the browser PROD runtime (no bundler dev guards)
  resolve: {
    alias: [
      { find: /^vue$/, replacement: "vue/dist/vue.runtime.esm-browser.prod.js" },
    ],
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    global: "globalThis",
  },
  optimizeDeps: {
    // Prevent esbuild from grabbing the bundler build of Vue
    exclude: ["vue"],
    esbuildOptions: {
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        global: "globalThis",
      },
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
      inlineDynamicImports: true,
      output: {
        manualChunks: undefined,
        // Safety prelude so `process` exists even if anything slips
        banner: `;(function(){var w=typeof window!=='undefined'?window:self;
          if(typeof w.process==='undefined')w.process={env:{NODE_ENV:'production'}};
          else if(typeof w.process.env==='undefined')w.process.env={NODE_ENV:'production'};
          if(typeof w.global==='undefined')w.global=w;
        })();`,
      },
    },
  },
});
