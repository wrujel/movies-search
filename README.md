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
  <h1>Movies Search with Next.js</h1>
</div>

<div align='center'>

  [![Next.js][nextjs]][nextjs-link]
  [![JavaScript][javascript]][javascript-link]
  [![React][react]][react-link]
  [![Tailwind CSS][tailwindcss]][tailwindcss-link]
  [![React-Hot-Toast][react-hot-toast]][react-hot-toast-link]
  [![Vercel][vercel]][vercel-link]

</div>

<div align='center'>
  A movie search app built with Next.js 13, React, and Tailwind CSS. Search for movies using the OMDB API with debounced input, sort results by year, and enjoy toast notifications and responsive design.

  [Demo]({{DEMO_URL}}) · [Report issue](/issues) · [Suggest something](/issues)
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
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
- [Contributing](#contributing)
- [License](#license)

## Features

- [x] Search movies using the OMDB API
- [x] Debounced search input for optimized API calls
- [x] Sort movies by release year
- [x] Toast notifications for search results and errors
- [x] Responsive design with Tailwind CSS
- [x] Image loading skeleton placeholders
- [x] Input validation (alphanumeric only, min 3 characters)
- [x] Next.js Image optimization for movie posters
- [x] Custom React hooks for search and movie state management
- [x] CSS Modules for scoped component styling

## Tech Stack

- [Next.js 13](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [just-debounce-it](https://www.npmjs.com/package/just-debounce-it)
- [react-hot-toast](https://react-hot-toast.com/)
- [Water.css](https://watercss.kognise.dev/)
- [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 16+
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

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

| Variable               | Description       | Required |
| :--------------------- | :---------------- | :------: |
| `NEXT_PUBLIC_URL_PATH` | OMDB API base URL |   Yes    |
| `NEXT_PUBLIC_API_KEY`  | OMDB API key      |   Yes    |

## Project Structure

```
/
├── public/
│   └── screenshot.png
├── app/
│   ├── components/
│   │   ├── ImageContainer.jsx
│   │   ├── Movies.jsx
│   │   └── Movies.module.css
│   ├── hooks/
│   │   ├── useMovies.js
│   │   └── useSearch.js
│   ├── mocks/
│   │   ├── search-with-results.json
│   │   └── search-without-results.json
│   ├── services/
│   │   └── searchMovies.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── page.module.css
├── next.config.js
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Demo

You can check out the demo:

[![Demo][demo]][demo-link]

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
[javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[tailwindcss]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[react-hot-toast]: https://img.shields.io/badge/React--Hot--Toast-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white

<!-- Badges links -->
[nextjs-link]: https://nextjs.org/
[javascript-link]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[react-link]: https://react.dev/
[tailwindcss-link]: https://tailwindcss.com/
[react-hot-toast-link]: https://react-hot-toast.com/
[vercel-link]: https://vercel.com/

<!-- Status badges -->
[demo]: https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-blue?style=for-the-badge
[demo-link]: https://movies-search-wrujel.vercel.app
[status]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-repos%2Fmain%2Fdata%2Fmovies-search.json&style=for-the-badge
[status-link]: https://github.com/wrujel/monitor-repos
[deploy]: https://img.shields.io/github/deployments/wrujel/movies-search/production?style=for-the-badge&label=Deploy
[tests]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-tests%2Fmain%2Fdata%2Fmovies-search.json&style=for-the-badge
[tests-link]: https://github.com/wrujel/monitor-tests
