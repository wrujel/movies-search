// Single source of truth for search-query rules, shared by the search input
// validation (useSearch) and the fetch gate (useMovies / useAutocomplete).

export const MIN_QUERY_LENGTH = 3;

// Allowed: letters, digits, spaces, and a small set of title punctuation.
export const ILLEGAL_QUERY_CHARS = /[^a-zA-Z0-9 \-':,.&!?()]/;

/** Cheap boolean gate used before firing a network request. */
export function isValidQuery(query) {
  if (!query) return false;
  if (query.length < MIN_QUERY_LENGTH) return false;
  if (ILLEGAL_QUERY_CHARS.test(query)) return false;
  return true;
}

/** Returns a user-facing error message, or `null` when valid (or empty). */
export function validateQuery(query) {
  if (!query) return null;
  if (ILLEGAL_QUERY_CHARS.test(query))
    return "Please remove special characters";
  if (query.length < MIN_QUERY_LENGTH) {
    return `Please enter at least ${MIN_QUERY_LENGTH} characters`;
  }
  return null;
}
