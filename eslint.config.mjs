import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Flat config (ESLint 9). Replaces .eslintrc.json + `next lint`, both removed in
// Next 16. `eslint-config-next/core-web-vitals` ships the rules + parser.
const eslintConfig = defineConfig([
  ...nextVitals,
  // eslint-config-next 16 promotes the React Compiler hook rules to errors. They
  // flag working-but-not-compiler-optimal patterns across the existing hooks;
  // keep them visible as warnings and address them in a dedicated pass rather
  // than refactoring during a version bump.
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
