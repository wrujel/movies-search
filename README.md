<div align='center'>

[![demo][demo]][demo-link]
[![status][status]][status-link]
[![deploy][deploy]](/)
[![test][tests]][tests-link]

</div>

<div align='center'>
  <a href='/'>
    <img
      src='/public/screenshot.png'
      alt='Screenshot of the app'
      width='100%'
    />
  </a>
</div>

<div align='center'>
  <h1>Movies Search with Next</h1>
</div>

<div align='center'>

[![Next.js][nextjs]][nextjs-link]
[![React][react]][react-link]
[![JavaScript][javascript]][javascript-link]
[![Tailwind CSS][tailwindcss]][tailwindcss-link]
[![Framer Motion][framer-motion]][framer-motion-link]
[![Headless UI][headless-ui]][headless-ui-link]
[![Lucide][lucide]][lucide-link]
[![React-Hot-Toast][react-hot-toast]][react-hot-toast-link]
[![Vitest][vitest]][vitest-link]
[![Vercel][vercel]][vercel-link]

</div>

<div align='center'>
  A cinematic movie discovery app built with Next.js 16 and React 19. Search the OMDB catalog through a server-side BFF that keeps your API key private, with autocomplete, favorites, infinite scroll, year/type filters, and a detail modal — all served from an optimized, cached image pipeline.

[Demo](https://movies-search-wrujel.vercel.app) · [Report issue](/issues) · [Suggest something](/issues)

</div>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running locally](#running-locally)
  - [Build](#build)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Acknowledgements](#acknowledgements)
- [Contributing](#contributing)
- [License](#license)

## Features

- [x] Server-side BFF — the OMDB API key stays on the server and is never shipped to the browser
- [x] Debounced search with input validation (alphanumeric, minimum 3 characters)
- [x] Autocomplete suggestions as you type
- [x] Recent searches persisted in `localStorage`
- [x] Save movies to favorites, persisted in `localStorage`
- [x] Infinite scroll pagination with an early-firing sentinel
- [x] Filter by media type and year range, and sort results by year
- [x] Movie detail modal with plot, cast, director, runtime, and rating
- [x] In-process response cache with retry and exponential backoff
- [x] Server-side poster pre-validation so the grid never drops broken cards on scroll
- [x] Next.js Image optimization (AVIF/WebP, responsive poster sizes)
- [x] Smooth animations with Framer Motion that respect `prefers-reduced-motion`
- [x] Accessible — focus trapping, keyboard navigation, and ARIA live regions
- [x] Toast notifications with react-hot-toast
- [x] Responsive grid with skeleton loading states
- [x] Unit tested with Vitest and deployed on Vercel

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router + Route Handlers)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [just-debounce-it](https://www.npmjs.com/package/just-debounce-it)
- [react-hot-toast](https://react-hot-toast.com/)
- [clsx](https://www.npmjs.com/package/clsx)
- [Vitest](https://vitest.dev/)
- [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- An [OMDB API key](https://www.omdbapi.com/apikey.aspx)

### Installation

```bash
git clone https://github.com/wrujel/movies-search.git
cd movies-search
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

| Command              | Action                                      |
| :------------------- | :------------------------------------------ |
| `npm install`        | Installs dependencies                       |
| `npm run dev`        | Starts the dev server at `localhost:3000`   |
| `npm run build`      | Builds the production bundle                |
| `npm run start`      | Serves the production build                 |
| `npm run lint`       | Lints the project with ESLint (flat config) |
| `npm run test`       | Runs the unit test suite once with Vitest   |
| `npm run test:watch` | Runs Vitest in watch mode                   |
| `npm run analyze`    | Builds with the bundle analyzer enabled     |

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

| Variable               | Description                                                                | Required |
| :--------------------- | :------------------------------------------------------------------------- | :------: |
| `URL_PATH`             | OMDB API base URL, including the trailing `?apikey=` (server-only)         |   Yes    |
| `API_KEY`              | Your OMDB API key (server-only, never exposed to the browser)              |   Yes    |
| `NEXT_PUBLIC_URL_PATH` | Legacy fallback for `URL_PATH`; optional once the server-only vars are set |    No    |
| `NEXT_PUBLIC_API_KEY`  | Legacy fallback for `API_KEY`                                              |    No    |

> The server-only `URL_PATH` / `API_KEY` are preferred — they keep the key off the client. The `NEXT_PUBLIC_*` variants are kept only as a fallback for environments not yet migrated.

## Project Structure

```
/
├── app/
│   ├── api/                      # Backend-for-frontend route handlers
│   │   ├── search/route.js       # GET /api/search
│   │   ├── movie/[id]/route.js   # GET /api/movie/:id
│   │   └── movies/route.js       # GET /api/movies?ids=
│   ├── components/               # UI (cards, modal, filters, search bar…)
│   ├── hooks/                    # Custom React hooks (favorites, scroll…)
│   ├── lib/                      # Utilities + unit tests
│   │   ├── omdb.js               # Server-only OMDB client (cache + retry)
│   │   ├── movies.js
│   │   ├── query.js
│   │   └── *.test.js
│   ├── services/                 # Client-side fetch wrappers
│   ├── mocks/                    # Sample API responses
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/                       # Static assets (icon, screenshot…)
├── eslint.config.mjs             # ESLint flat config
├── next.config.js                # Image optimization + remote patterns
├── tailwind.config.js
├── postcss.config.js
├── vitest.config.mjs
└── package.json
```

## Demo

You can check out the demo:

[![Demo][demo]][demo-link]

## API Reference

All routes are server-side handlers that proxy the OMDB API, adding caching, retries, and poster validation. No authentication is required.

| Method | Endpoint                                          | Description                                | Auth Required |
| :----- | :------------------------------------------------ | :----------------------------------------- | :-----------: |
| `GET`  | `/api/search?query=&page=&type=&year=&validate=1` | Search movies, paginated and filterable    |      No       |
| `GET`  | `/api/movie/:id`                                  | Get full detail for one movie by IMDb ID   |      No       |
| `GET`  | `/api/movies?ids=tt1,tt2,tt3`                     | Batch detail lookup (used for prefetching) |      No       |

## Troubleshooting

<details>
<summary>"OMDB API is not configured" error</summary>

The server can't find your API credentials. Make sure you have a `.env` file in the project root with `URL_PATH` and `API_KEY` (or the legacy `NEXT_PUBLIC_*` equivalents) set, then restart the dev server:

```bash
URL_PATH=https://www.omdbapi.com/?apikey=
API_KEY=your_omdb_key_here
```

</details>

<details>
<summary>Posters don't load</summary>

Movie posters are served from `m.media-amazon.com` through the Next.js image optimizer. That host is allowlisted in `next.config.js` via `remotePatterns` — if you change the poster source, add the new hostname there or the optimizer will reject it.

</details>

## Acknowledgements

- [OMDB API](https://www.omdbapi.com/) — movie data source

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE.md).

---

<!-- Badges -->

[nextjs]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[tailwindcss]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[framer-motion]: https://img.shields.io/badge/Framer%20Motion-2A2A2A?style=for-the-badge&logo=framer&logoColor=white
[headless-ui]: https://img.shields.io/badge/Headless%20UI-66E3FF?style=for-the-badge&logo=headlessui&logoColor=black
[lucide]: https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white
[react-hot-toast]: https://img.shields.io/badge/React--Hot--Toast-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[vitest]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white

<!-- Badges links -->

[nextjs-link]: https://nextjs.org/
[react-link]: https://react.dev/
[javascript-link]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[tailwindcss-link]: https://tailwindcss.com/
[framer-motion-link]: https://www.framer.com/motion/
[headless-ui-link]: https://headlessui.com/
[lucide-link]: https://lucide.dev/
[react-hot-toast-link]: https://react-hot-toast.com/
[vitest-link]: https://vitest.dev/
[vercel-link]: https://vercel.com/

<!-- Status badges -->

[demo]: https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-blue?style=for-the-badge
[demo-link]: https://movies-search-wrujel.vercel.app
[status]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-repos%2Fmain%2Fdata%2Fmovies-search.json&style=for-the-badge
[status-link]: https://github.com/wrujel/monitor-repos
[deploy]: https://img.shields.io/github/deployments/wrujel/movies-search/production?style=for-the-badge&label=Deploy
[tests]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-tests%2Fmain%2Fdata%2Fmovies-search.json&style=for-the-badge
[tests-link]: https://github.com/wrujel/monitor-tests
