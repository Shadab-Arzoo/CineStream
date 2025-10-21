import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

function Detailspage() {
  const { id } = useParams(); // ✅ get movie id from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
  <div className="p-8 text-white bg-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg mb-6"
      />
      <p>{movie.overview}</p>
      <p className="mt-4 text-sm text-gray-400">
        Release Date: {movie.release_date} | Rating: {movie.vote_average}
      </p>
    </div>
  );
}

export default Detailspage;