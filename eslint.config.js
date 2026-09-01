// @ts-check
// ESLint flat config (P1-N009 child A, node P1-N010, spec criterion
// 1). Adopted from project-orchestrator-service's shape (decision 9):
// typescript-eslint recommended plus eslint-config-prettier.
//
// Divergence from the service repository's eslint.config.js: this
// repository's typed-linting project is tsconfig.json directly rather
// than a separate tsconfig.eslint.json, because tsconfig.json's own
// "include" here already covers everything this repository lints
// (plugin/scripts and test) — the service repo needed a second config
// only because its tsconfig.json's "include" is "src" alone and its
// tests live outside it.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    // Type-aware linting only for the TypeScript sources tsconfig.json
    // actually includes (plugin/scripts, test) — this config file
    // itself is plain JS and outside that project.
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
