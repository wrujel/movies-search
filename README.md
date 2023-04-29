<!-- Title -->
<div align="center">
  <h1>Movies Search App</h1>
</div>

<!-- Badges -->
<div align="center">
  <a href="/README.md">
    <img 
      src="https://img.shields.io/badge/Status-Complete-success.svg" 
      alt="Status" 
    />
  </a>
  <a href="/package.json">
    <img 
      src="https://img.shields.io/badge/Version-1.0.0-blue.svg" 
      alt="Version" 
    />
  </a>
  <a href="/LICENSE">
    <img 
      src="https://img.shields.io/badge/License-MIT-green.svg" 
      alt="License: MIT" 
    />
  </a>
  <a href="https://vercel.com/">
    <img
      src="https://img.shields.io/badge/vercel-Deployed-success.svg?style=flat&logo=vercel"
      alt="Deployed on Vercel"
    />
  </a>
  <a href="https://nextjs.org/">
    <img 
      src="https://img.shields.io/badge/Next.js-13.0.0+-blue.svg?style=flat&logo=next.js" 
      alt="Next.js version" 
    />
  </a>
  <a href="https://reactjs.org/">
    <img 
      src="https://img.shields.io/badge/React-18.0.0+-blue.svg?style=flat&logo=react" 
      alt="React version" 
    />
  </a>
  <a href="https://www.javascript.com/">
    <img 
      src="https://img.shields.io/badge/JavaScript-ES6+-blue.svg?style=flat&logo=javascript" 
      alt="JavaScript version" 
    />
  </a>
  <a href="https://watercss.kognise.dev/">
    <img 
      src="https://img.shields.io/badge/Water.css-1.4.0+-blue.svg?style=flat&logo=css3" 
      alt="Water.css version" 
    />
  </a>
  <a href="https://www.npmjs.com/package/just-debounce-it">
    <img 
      src="https://img.shields.io/badge/Just--Debounce--It-2.0.0+-blue.svg?style=flat&logo=npm" 
      alt="Just-Debounce-It version" 
    />
  </a>
</div>
<br />

This app will allow you to search for movies and tv shows. It uses [OMDb API](https://www.omdbapi.com) to fetch the data and display it. 

## Features

- [x] Has a form with a search input and a submit button.
- [x] Show a list of movies with title, year and poster.
- [x] Grid responsive layout.
- [x] Fetch data from [OMDb API](https://www.omdbapi.com).
- [x] Prevent same search from being made twice.
- [x] Search is made while typing.
- [x] Has a debounce function to prevent too many requests.

## Tech Stack

- Vercel (Deployment)
- [Next.js 13 App Router](https://beta.nextjs.org/docs/getting-started)
- React 18
- JavaScript
- [Water.css](https://watercss.kognise.dev/)
- [Just-Debounce-It](https://github.com/angus-c/just)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

To run this project locally, you have to clone the repository.

You will need an API to get movies for example [OMDb API](https://www.omdbapi.com) and get an API Key. Once you have your key, create a `.env.local` file in the root of the project and add the following:

```bash
NEXT_PUBLIC_URL_PATH=your_url_path
NEXT_PUBLIC_API_KEY=your_api_key
```

Then run the following commands to install the dependencies and start the development server:

```bash
npm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo

You can check out the demo [here](https://movies-search-wrujel.vercel.app).
