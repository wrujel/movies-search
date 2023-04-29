<div align="center">
  <h1>Movies Search App</h1>
</div>
<br />

This app will allow you to search for movies and tv shows. It uses [OMDb API](https://www.omdbapi.com) to fetch the data and display it. 

## Features

✅ Has a form with a search input and a submit button.
✅ Show a list of movies with title, year and poster.
✅ Grid responsive layout.
✅ Fetch data from [OMDb API](https://www.omdbapi.com).
✅ Prevent same search from being made twice.
✅ Search is made while typing.
✅ Has a debounce function to prevent too many requests.

## Tech Stack

- [Next.js 13 App Router](https://beta.nextjs.org/docs/getting-started)
- React 18
- JavaScript
- [Water.css](https://watercss.kognise.dev/)
- [Just-Debounce-It](https://github.com/angus-c/just)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

To run this project locally, you will need an API to get movies for example [OMDb API](https://www.omdbapi.com) and get an API Key. Once you have your key, create a `.env.local` file in the root of the project and add the following:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.js`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Demo

You can check out the demo [here](https://movies-search-wrujel.vercel.app).
