# movies

> 🍿 A TMDB client built with Next.js 14

Welcome to the "movies" web app! This app allows you to search for movies, TV shows, or people by title and view their details, including overview, release date, and average rating. You can also watch movie trailers and browse popular movies, top-rated movies, upcoming movies, and now playing movies.

<img src="https://api.microlink.io/?url=https://movies.oktaycolakoglu.com&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=dark&overlay.background=linear-gradient%28225deg%2C+%23FF057C+0%25%2C+%238D0B93+50%25%2C+%23321575+100%25%29" />

## Features

- Search for movies, TV shows, or people by title
- View movie details, including overview, release date, and average rating
- Watch movie trailers
- Browse popular movies, top-rated movies, upcoming movies, and now playing movies
- Discover movies and TV shows with filters (genre, year, rating, etc.)
- View cast and crew information
- Responsive design optimized for mobile, tablet, and desktop devices
- Dark/Light theme support

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix + Tailwind)
- **API:** [The Movie Database (TMDB)](https://developers.themoviedb.org/3)

## Getting Started

### Prerequisites

- Node.js 18+
- TMDB API Key ([Get one here](https://developers.themoviedb.org/3))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/oktay/movies.git
cd movies
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` and add your TMDB API key:

```bash
TMDB_KEY=your-api-key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Project structure, app router patterns, data flow
- [CONVENTIONS.md](CONVENTIONS.md) - Code style, component patterns, naming conventions

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (home)/            # Home page
│   ├── (lists)/           # List pages (popular, trending, discover)
│   └── (detail)/          # Detail pages (movie, tv, people)
├── components/            # React components
│   ├── ui/                # shadcn/ui primitives
│   ├── media/             # Shared media components
│   ├── movie/             # Movie-specific components
│   └── tv/                # TV-specific components
├── tmdb/                  # TMDB API integration
│   ├── api/               # API functions
│   └── models/            # TypeScript types
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── config/                # Site configuration
```

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB.

<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" width="120" />

## Contributing

Contributions are welcome! Please read the [CONVENTIONS.md](CONVENTIONS.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
