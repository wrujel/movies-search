import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Flat config (ESLint 9). Replaces .eslintrc.json + `next lint`, both removed in
// Next 16. `eslint-config-next/core-web-vitals` ships the rules + parser.
const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
