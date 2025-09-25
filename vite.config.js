import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'

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
      '__VUE_HMR_RUNTIME__': 'undefined',
      preventAssignment: true,
    })
  ],
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    target: 'es2018',
    minify: 'terser',
    lib: {
      entry: 'src/main.ts',
      name: 'LogezyWidgets',
      formats: ['iife', 'esm'],
      fileName: (f) => (f === 'iife' ? 'widgets.min.js' : `widgets.${f}.js`),
    },
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return 'widgets.[ext]'
        }
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})