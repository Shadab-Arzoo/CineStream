import { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, searchMovies, searchMulti } from "../api/tmdb";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("multi");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError("");
      setHasSearched(true);
      const data =
        searchType === "movie"
          ? await searchMovies(query.trim(), 1)
          : await searchMulti(query.trim(), 1);
      const normalizedResults = (data.results || []).filter(
        (item) => item.media_type !== "person"
      );
      setResults(normalizedResults);
    } catch (error) {
      setError("Could not fetch search results.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10 text-white md:px-8">
      <h1 className="mb-6 text-3xl font-bold">Search Movies & TV</h1>

      <form onSubmit={handleSearch} className="mb-8 flex flex-wrap gap-2">
        <select
          className="rounded-lg border border-white/20 bg-zinc-900 px-3 py-3 text-white outline-none focus:border-yellow-400"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="multi">All (Movies + TV)</option>
          <option value="movie">Movies only</option>
        </select>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-lg rounded-lg border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-400"
        />
        <button type="submit" className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black">
          Search
        </button>
      </form>

      {isLoading && <p className="py-8 text-zinc-400">Searching…</p>}
      {error && <p className="py-8 text-red-300">{error}</p>}
      {hasSearched && !isLoading && !error && results.length === 0 && (
        <p className="py-8 text-zinc-400">No results found. Try another title.</p>
      )}

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {results.map((movie) => {
          const mediaType = movie.media_type || "movie";
          const title = movie.title || movie.name;
          const releaseDate = movie.release_date || movie.first_air_date;
          return (
          <Link
            to={`/${mediaType}/${movie.id}`}
            key={`${mediaType}-${movie.id}`}
            className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1 hover:border-white/30"
          >
            <img
              src={getImageUrl(movie.poster_path, "w500") || "https://via.placeholder.com/300x450?text=No+Image"}
              alt={title}
              className="h-[320px] w-full object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1 text-xs text-zinc-400">{releaseDate || "Unknown date"}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-yellow-300">{mediaType}</p>
            </div>
          </Link>
        )})}
      </div>
    </div>
  );
};

export default Searchbar;
