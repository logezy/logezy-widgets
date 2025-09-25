import globals from "globals";
import eslintPlugin from "@eslint/js";
import vuePluginPkg from "eslint-plugin-vue";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import parserVue from "vue-eslint-parser";
import type { Linter } from "eslint";

const tseslintConfigs = tseslintPlugin.configs;

export default [
  // Base ESLint recommended rules
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules,
      // General rules
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
    },
  },
  // TypeScript specific configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      ...tseslintConfigs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  // Vue specific configuration
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTs,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue: vuePluginPkg,
      "@typescript-eslint": tseslintPlugin, // Needed for <script lang="ts"> in Vue files
    },
    rules: {
      ...vuePluginPkg.configs["flat/recommended"].rules,
      "vue/multi-word-component-names": "off",
    },
  },
  // Ignore files/directories
  {
    ignores: ["dist/", "node_modules/"],
  },
] satisfies Linter.Config[];
