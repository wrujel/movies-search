import { useEffect, useState } from "react";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === "") {
      setError(null);
      return;
    }

    if (query.match(/[^a-zA-Z0-9 ]/)) {
      setError("Please enter only letters and numbers");
      return;
    }

    if (query.length < 3) {
      setError("Please enter at least 3 characters");
      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
}
