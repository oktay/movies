# movies

> 🍿 A TMDB client build with Next.js 14

Welcome to the "movies" web app! This app allows you to search for movies, TV shows, or people by title and view their details, including overview, release date, and average rating. You can also watch movie trailers and browse popular movies, top-rated movies, upcoming movies, and now playing movies.

The app is built using Next.js, a React framework for building server-side rendered and static websites. It also utilizes Tailwind CSS, a utility-first CSS framework for rapidly building custom designs. The Movie Database API is used to access a vast collection of movie and TV show data.

To get started with the app, follow the steps outlined in the "Getting Started" section of this README. Contributions are welcome, so if you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

Happy movie browsing!

## Getting Started

To get started with the Movies web app, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/oktay/movies.git
```

2. Install the dependencies:

```bash
cd movies
npm install
```

3. Obtain an API key from [The Movie Database API](https://developers.themoviedb.org/3) and add it to the `.env.local` file:

```bash
TMDB_KEY=your-api-key
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to view the Movies web app.

## Features

- Search for movies, TV shows, or people by title.
- View movie details, including overview, release date, and average rating.
- Watch movie trailers.
- Browse popular movies, top-rated movies, upcoming movies, and now playing movies.
- Responsive design optimized for mobile, tablet, and desktop devices.

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static websites.
- [shadcn/ui](https://ui.shadcn.com/) - UI library for fundamental ui elements.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [The Movie Database API](https://developers.themoviedb.org/3) - An API that provides access to a vast collection of movie and TV show data.
- [Vercel](https://vercel.com/) - A cloud platform for static sites and serverless functions.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
