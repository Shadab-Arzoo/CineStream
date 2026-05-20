import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getImageUrl,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "../api/tmdb";

const FEED_LABELS = {
  popular: "Popular Movies",
  trending: "Trending This Week",
  "now-playing": "Now Playing",
  upcoming: "Upcoming Movies",
  "top-rated": "Top Rated Movies",
};

const Movies = ({ feed = "popular", genreId }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const normalizedFeed = ["popular", "trending", "now-playing", "upcoming", "top-rated"].includes(feed)
    ? feed
    : "popular";
  const hasGenreFilter = Boolean(genreId);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError("");

        let data;
        if (hasGenreFilter) {
          data = await getPopularMovies(page, genreId);
        } else if (normalizedFeed === "trending") {
          data = await getTrendingMovies(page);
        } else if (normalizedFeed === "now-playing") {
          data = await getNowPlayingMovies(page);
        } else if (normalizedFeed === "upcoming") {
          data = await getUpcomingMovies(page);
        } else if (normalizedFeed === "top-rated") {
          data = await getTopRatedMovies(page);
        } else {
          data = await getPopularMovies(page);
        }

        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        setError("Could not load movies.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [normalizedFeed, hasGenreFilter, genreId, page]);

  useEffect(() => {
    setPage(1);
  }, [normalizedFeed, genreId]);

  const title = hasGenreFilter ? "Movies by Genre" : FEED_LABELS[normalizedFeed];

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
          Page {page} of {totalPages}
        </span>
      </div>

      {isLoading && <p className="py-8 text-center text-zinc-400">Loading movies…</p>}
      {error && <p className="py-8 text-center text-red-300">{error}</p>}
      {!isLoading && !error && movies.length === 0 && (
        <p className="py-8 text-center text-zinc-400">No movies found.</p>
      )}

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => {
          const imgPath = movie.poster_path || movie.backdrop_path;
          const imgUrl = getImageUrl(imgPath, "w500") || "https://via.placeholder.com/500x750?text=No+Image";
          const movieTitle = movie.title || movie.name;

          return (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1 hover:border-white/30"
            >
              <img src={imgUrl} alt={movieTitle} className="h-[320px] w-full object-cover" />
              <div className="p-3">
                <h3 className="line-clamp-2 text-sm font-semibold text-white">{movieTitle}</h3>
                <p className="mt-1 text-xs text-zinc-400">{movie.release_date || "Unknown date"}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
