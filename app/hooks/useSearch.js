import { useEffect, useState } from "react";
import { validateQuery } from "../lib/query";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(validateQuery(query));
  }, [query]);

  return { query, setQuery, error };
}
