import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`
      );
      setResults(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center text-white mt-6">
      {/* 🔍 Search input form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md outline-none w-64"
        />
        <button type="submit" className="bg-yellow-400 text-black px-4 rounded-md">
          Search
        </button>
      </form>

      {/* 🎬 Results Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
        {results.map((movie) => (
          <Link 
            to={`/movie/${movie.id}`} // ✅ fixed here
            key={movie.id} 
            className="bg-gray-900 p-2 rounded-lg text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="rounded-md mb-2"
            />
            <h3 className="text-sm">{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;