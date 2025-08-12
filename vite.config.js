import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
      script: { 
        defineModel: true,
        propsDestructure: true
      },
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('logezy-')
        }
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    })
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.runtime.esm-browser.prod.js",
    },
  },
  build: {
    target: "es2018",
    minify: "esbuild",
    lib: {
      entry: "src/main.ts",
      name: "LogezyWidgets",
      formats: ["iife", "esm"],
      fileName: (f) => (f === "iife" ? "widgets.min.js" : `widgets.${f}.js`),
    },
    rollupOptions: {
      output: {
      },
    },
  },
});