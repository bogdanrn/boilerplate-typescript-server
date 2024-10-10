import eslint from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
import tsEslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import markdown from "eslint-plugin-markdown";
import prettierConfig from 'eslint-config-prettier';

const ignores = [
  // Sure, let's lint our lint config... :D
  // ./eslint.config.js
  ".DS_Store",
  ".env",
  ".env.*",
  ".github",
  // On CI our PNPM store is local to the application source
  ".pnpm-store/**/*",
  ".vscode",
  "node_modules/**/*",
  "build/**/*",
  "package/**/*",
  ".husky/install.mjs",
  // Ignore files for PNPM, NPM and YARN
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  "dist"

];

export default [
  { ignores },
  ...markdown.configs.recommended,
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  jsdoc.configs["flat/recommended"],
  prettierConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsEslint.parser,
      globals: {
        ...globals.node,
      },
    },
  },

  {
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
      import: pluginImport,
    },
    rules: {
      semi: "warn",
    },
  },
];
