[demo]: https://img.shields.io/badge/🚀%20Live%20Demo-000000?style=for-the-badge&&logoColor=white&color=0a6bdb
[status-link]: https://github.com/wrujel/monitor-repos
[tests-link]: https://github.com/wrujel/monitor-tests

[demo-link]: https://movies-search-wrujel.vercel.app
[status]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-repos%2Fmain%2Fdata%2Fmovies-search.json
[deploy]: https://img.shields.io/github/deployments/wrujel/movies-search/production?style=for-the-badge&label=Deploy
[tests]: https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwrujel%2Fmonitor-tests%2Fmain%2Fdata%2Fmovies-search.json

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
      width='65%'
    />
  </a>
</div>

<!-- Title -->
<div align="center">
  <h1>Movies Search App</h1>
</div>

<div align="center">
  
  [![Next.js][nextjs]][nextjs-link]
  [![React][react]][react-link]
  [![JavaScript][javascript]][javascript-link]
  [![Tailwind CSS][tailwindcss]][tailwindcss-link]
  [![Just-Debounce-It][use-debounce]][use-debounce-link]
  [![React Hot Toast][react-hot-toast]][react-hot-toast-link]
  [![Vercel][vercel]][vercel-link]

</div>

<div align='center'>
  This app will allow you to search for movies and tv shows. It uses OMDb API to fetch the data and display it.

  [Demo](https://movies-search-wrujel.vercel.app) · [Report issue](/issues) · [Suggest something](/issues)
</div>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Demo](#demo)

## Features

- [x] Has a form with a search input and a submit button.
- [x] Show a list of movies with title, year and poster.
- [x] Grid responsive layout.
- [x] Fetch data from [OMDb API](https://www.omdbapi.com).
- [x] Prevent same search from being made twice.
- [x] Search is made while typing.
- [x] Has a debounce function to prevent too many requests.
- [x] Use React Hot Toast to show notification messages.
- [x] Images skeleton loading.

## Tech Stack

- Vercel (Deployment)
- [Next.js 13 App Router](https://beta.nextjs.org/docs/getting-started)
- React 18
- JavaScript
- [Water.css](https://watercss.kognise.dev/)
- [Just-Debounce-It](https://github.com/angus-c/just)
- [React Hot Toast](https://react-hot-toast.com/)
- [Tailwind CSS](https://tailwindcss.com/)

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

You can check out the demo:

[![demo][demo]][demo-link]




<!-- Badges -->
[nextjs]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js
[typescript]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[tailwindcss]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[lodash]: https://img.shields.io/badge/Lodash-2A2A2A?style=for-the-badge&logo=lodash
[next-auth]: https://img.shields.io/badge/Next--Auth-black?style=for-the-badge&logo=next.js
[prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[axios]: https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white
[react-icons]: https://img.shields.io/badge/React--Icons-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[swr]: https://img.shields.io/badge/SWR-black?style=for-the-badge&logo=next.js
[zustand]: https://img.shields.io/badge/Zustand-2A2A2A?style=for-the-badge&logo=npm
[react-player]: https://img.shields.io/badge/React--Player-2A2A2A?style=for-the-badge&logo=npm
[mongodb]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[html]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[css]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[netlify]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[astro]: https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE
[express]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[mongoose]: https://img.shields.io/badge/Mongoose-2A2A2A?style=for-the-badge&logo=mongoose&logoColor=white
[angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-material]: https://img.shields.io/badge/Angular%20Material-DD0031?style=for-the-badge&logo=angular&logoColor=white
[nodejs]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[netsjs]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[swagger]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white
[jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[react-hot-toast]: https://img.shields.io/badge/React--Hot--Toast-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[github-api]: https://img.shields.io/badge/Github%20API-181717?style=for-the-badge&logo=github&logoColor=white
[date-fns]: https://img.shields.io/badge/Date--fns-F7841B?style=for-the-badge&logo=date-fns&logoColor=white
[django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[django-rest-framework]: https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white
[coreapi]: https://img.shields.io/badge/Coreapi-2A2A2A.svg?style=for-the-badge&logo=coreapi
[bcrypt]: https://img.shields.io/badge/Bcrypt-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[recharts]: https://img.shields.io/badge/Recharts-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[use-debounce]: https://img.shields.io/badge/Use--Debounce-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[framer-motion]: https://img.shields.io/badge/Framer%20Motion-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[tsparticles]: https://img.shields.io/badge/Tsparticles-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[swiper]: https://img.shields.io/badge/Swiper-6332D2?style=for-the-badge&logo=swiper&logoColor=white
[react-countup]: https://img.shields.io/badge/React%20Countup-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[cloudinary]: https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white
[query-string]: https://img.shields.io/badge/Query%20String-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-date-range]: https://img.shields.io/badge/React%20Date%20Range-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-hook-form]: https://img.shields.io/badge/React%20Hook%20Form-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-spinners]: https://img.shields.io/badge/React%20spinners-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[world-countries-data]: https://img.shields.io/badge/World%20countries%20data-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-leaflet]: https://img.shields.io/badge/React%20Leaflet-2A2A2A?style=for-the-badge&logo=npm&logoColor=white
[react-select]: https://img.shields.io/badge/React%20Select-2A2A2A?style=for-the-badge&logo=npm&logoColor=white


<!-- Badges links -->
[nextjs-link]: https://nextjs.org/
[typescript-link]: https://www.typescriptlang.org/
[tailwindcss-link]: https://tailwindcss.com/
[react-link]: https://reactjs.org/
[lodash-link]: https://lodash.com/
[next-auth-link]: https://next-auth.js.org/
[prisma-link]: https://www.prisma.io/
[axios-link]: https://axios-http.com/
[react-icons-link]: https://react-icons.github.io/react-icons/
[swr-link]: https://swr.vercel.app/
[zustand-link]: https://zustand.surge.sh/
[react-player-link]: https://www.npmjs.com/package/react-player
[mongodb-link]: https://www.mongodb.com/
[vercel-link]: https://vercel.com/
[html-link]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css-link]: https://developer.mozilla.org/en-US/docs/Web/CSS
[javascript-link]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[netlify-link]: https://www.netlify.com/
[vite-link]: https://vitejs.dev/
[astro-link]: https://astro.build/
[express-link]: https://expressjs.com/
[mongoose-link]: https://mongoosejs.com/
[angular-link]: https://angular.io/
[angular-material-link]: https://material.angular.io/
[nodejs-link]: https://nodejs.org/en/
[netsjs-link]: https://nestjs.com/
[swagger-link]: https://swagger.io/
[jest-link]: https://jestjs.io/
[react-hot-toast-link]: https://react-hot-toast.com/
[github-api-link]: https://docs.github.com/en/rest
[date-fns-link]: https://date-fns.org/
[django-link]: https://www.djangoproject.com/
[django-rest-framework-link]: https://www.django-rest-framework.org/
[coreapi-link]: https://www.coreapi.org/
[bcrypt-link]: https://www.npmjs.com/package/bcrypt
[recharts-link]: http://recharts.org/en-US/
[use-debounce-link]: https://www.npmjs.com/package/use-debounce
