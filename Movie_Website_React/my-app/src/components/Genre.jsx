import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getGenres } from "../api/tmdb";

const Genre = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [genre, setGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const selectedGenre = searchParams.get("genre") || "all";

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getGenres();
        setGenre(data.genres || []);
      } catch (error) {
        setError("Could not load genres");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenre();
  }, []);

  return (
    <div className="min-w-[150px]">
      <select
        aria-label="Select genre"
        className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-[0.58rem] text-sm text-white outline-none focus:border-yellow-400"
        disabled={isLoading || !!error}
        value={selectedGenre}
        onChange={(e) => {
          const selectedGenre = e.target.value;
          if (selectedGenre === "all") {
            navigate("/");
            return;
          }
          navigate(`/?genre=${selectedGenre}`);
        }}
      >
        <option value="all" className="bg-zinc-900 text-white">All Genres</option>
        {genre.map((g) => (
          <option value={g.id} key={g.id} className="bg-zinc-900 text-white">
            {g.name}
          </option>
        ))}
      </select>
      {(isLoading || error) && (
        <span className="ml-2 text-xs text-zinc-400">{error || "Loading…"}</span>
      )}
    </div>
  );
};

export default Genre;
