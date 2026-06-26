// Shared shape definitions as JSDoc typedefs. Importing this file is not
// required — reference the types with `@type {import('../lib/types').Movie}`
// to get editor intellisense without committing to a full TypeScript build.

/**
 * A search-result movie (from the OMDB `s=` endpoint).
 * @typedef {Object} Movie
 * @property {string} id              IMDb id, e.g. "tt1375666"
 * @property {string} title
 * @property {string} year            Raw OMDB year string ("2010", "2010–2014")
 * @property {string|null} poster     Poster URL, or null when "N/A"
 * @property {"movie"|"series"|"episode"} type
 * @property {number|null} [yearNumber]  Parsed leading year (added client-side)
 */

/**
 * A fully-detailed title (from the OMDB `i=` endpoint).
 * @typedef {Object} MovieDetail
 * @property {string} id
 * @property {string} title
 * @property {string} year
 * @property {string|null} poster
 * @property {string|null} plot
 * @property {string|null} genre
 * @property {string|null} director
 * @property {string|null} actors
 * @property {string|null} runtime
 * @property {string|null} rating
 * @property {string|null} rated
 * @property {string} type
 */

export {};
