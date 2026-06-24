import { useMemo, useState } from "react";
import { validateQuery } from "../lib/query";

export function useSearch() {
  const [query, setQuery] = useState("");
  // The error is a pure function of the query — derive it, don't store it in
  // state + sync via an effect.
  const error = useMemo(() => validateQuery(query), [query]);

  return { query, setQuery, error };
}
