import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const eslintConfig = tseslint.config(
  ...tseslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    ignores: [".next/**", "coverage/**", "next-env.d.ts"],
  },
);

export default eslintConfig;
