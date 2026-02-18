import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import n from "eslint-plugin-n";
import checkfile from "eslint-plugin-check-file";

export default defineConfig([
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	prettierConfig,
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		plugins: { js, prettierPlugin, n, checkfile },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: ["error"],
      quotes: ["error", "double"],
      "n/no-process-env": "error",
      "checkfile/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "checkfile/folder-naming-convention": [
        "error",
        { "src/**/!(__tests__|^[.*)": "KEBAB_CASE" },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
		},
	},
]);
