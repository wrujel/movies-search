// Pure, framework-free helpers for movie data. Kept here (not inside hooks) so
// they can be unit-tested in isolation.

/**
 * OMDB years come as "2012", "2012–" or "2012-2014". Extract the leading year.
 * @param {string|number|null|undefined} year
 * @returns {number|null}
 */
export function normalizeYear(year) {
  if (!year) return null;
  const first = String(year).split("–")[0].split("-")[0];
  const n = parseInt(first, 10);
  return Number.isFinite(n) ? n : null;
}

/**
 * Immutable Set union. Returns the *same* reference when nothing was added so
 * React can bail out of a re-render.
 * @param {Set<string>} prev
 * @param {Iterable<string>} toAdd
 * @returns {Set<string>}
 */
export function mergeSet(prev, toAdd) {
  let added = false;
  const next = new Set(prev);
  for (const id of toAdd) {
    if (!next.has(id)) {
      next.add(id);
      added = true;
    }
  }
  return added ? next : prev;
}

/**
 * Amazon media poster URLs accept a server-side width via the `_SX{n}` token
 * (e.g. `..._V1_SX300.jpg`). Downscale for cheap existence-probing; the visible
 * card still requests the full-size image. No-ops on non-matching URLs.
 * @param {string|null} poster
 * @param {number} [width]
 * @returns {string|null}
 */
export function thumbnailUrl(poster, width = 120) {
  if (!poster) return poster;
  return poster.replace(/_SX\d+(?=\.\w+$)/i, `_SX${width}`);
}

/**
 * Right-sized poster for grid cards. Cards render at ~240px, so asking OMDB for
 * a ~400px source (covers 2× DPR) keeps the upstream fetch — and the bytes the
 * image optimizer has to process — small. No-ops on non-matching URLs.
 * @param {string|null} poster
 * @param {number} [width]
 * @returns {string|null}
 */
export function posterUrl(poster, width = 400) {
  return thumbnailUrl(poster, width);
}

/**
 * Tiny solid-surface SVG used as the `blurDataURL` for poster placeholders so
 * the image swap fades from the card's own background instead of popping.
 */
export const POSTER_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzEyJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjMTYxQjMwJy8+PC9zdmc+";
