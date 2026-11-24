import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Feature-first architecture boundaries (see CLAUDE.md).
const deepFeatureImport = {
  regex: "^@/features/[^/]+/.+",
  message:
    "Import features only through their public API (e.g. '@/features/candidates'). Inside a feature, use relative imports.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [deepFeatureImport] }],
    },
  },
  {
    // Shared layers must stay business-agnostic.
    files: [
      "src/components/**/*.{ts,tsx}",
      "src/lib/**/*.{ts,tsx}",
      "src/hooks/**/*.{ts,tsx}",
      "src/types/**/*.{ts,tsx}",
      "src/config/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^@/features(/|$)",
              message:
                "Shared modules must not depend on features. Move the shared piece out of the feature instead.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
