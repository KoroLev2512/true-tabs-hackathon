import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  stylistic.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    },
  },
  ...tseslint.config({
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  }),
];

export default eslintConfig;
