// Builds autocomplete phrase suggestions from a batch of result titles.
// Pure and dependency-free so it can be unit-tested directly.

const STOP_WORDS = new Set([
  "and",
  "the",
  "of",
  "a",
  "an",
  "in",
  "on",
  "with",
  "for",
  "to",
  "or",
  "at",
  "by",
]);

const MAX_PHRASE_WORDS = 3;

/**
 * From `titles`, collect up-to-3-word phrases whose first word starts with the
 * query, ranked by frequency then brevity.
 * @param {string} query
 * @param {string[]} titles
 * @param {number} limit
 * @returns {string[]}
 */
export function buildCompletions(query, titles, limit) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const counts = new Map();

  for (const title of titles) {
    if (!title) continue;
    const words = title.split(/\s+/).filter(Boolean);

    for (let i = 0; i < words.length; i++) {
      const head = words[i].toLowerCase().replace(/^[^a-z0-9']+/, "");
      if (!head.startsWith(q)) continue;

      const maxLen = Math.min(MAX_PHRASE_WORDS, words.length - i);
      for (let len = 1; len <= maxLen; len++) {
        const slice = words.slice(i, i + len);
        const lastClean = slice[slice.length - 1]
          .toLowerCase()
          .replace(/[^a-z0-9']/g, "");
        if (len > 1 && STOP_WORDS.has(lastClean)) continue;

        const candidate = slice.join(" ");
        const key = candidate.toLowerCase();
        const existing = counts.get(key);
        if (existing) existing.count += 1;
        else
          counts.set(key, {
            display: candidate,
            count: 1,
            length: candidate.length,
          });
      }
      break; // only first matching word position per title
    }
  }

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count || a.length - b.length)
    .slice(0, limit)
    .map((c) => c.display);
}
