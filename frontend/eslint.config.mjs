import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.jsとTypeScriptの基本設定を拡張
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // stories.tsxファイルに関するルールのオーバーライド
  {
    files: [
      "src/stories/**/*.stories.tsx",
      "**/.storybook/**/*.tsx", // パターンを正しく修正
    ],
    rules: {
      "import/no-default-export": "off", // stories.tsxに関してデフォルトエクスポートの禁止を無効化
    },
  },

  // TypeScriptファイル全体の設定
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      unicorn: unicorn,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...(typescript.configs?.["recommended-type-checked"]?.rules ?? {}),
      ...(typescript.configs?.["stylistic-type-checked"]?.rules ?? {}),
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      "react/display-name": "off", // デフォルトでReactのdisplayNameルールを無効化
    },
  },

  // 特定の設定を個別に追加
  {
    files: [
      "**/page.tsx",
      "**/layout.tsx",
      "next.config.ts",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "jest.config.ts",
    ],
    rules: {
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",
    },
  },

  // 無視するファイルやディレクトリを指定（.eslintignoreの代替）
  {
    ignores: [
      "src/components/ui/*", // 特定のディレクトリを無視
      "*.md", // Markdownファイルを無視
      "**/*.stories.tsx", // stories.tsxファイルを無視
    ],
  },
];

export default eslintConfig;
