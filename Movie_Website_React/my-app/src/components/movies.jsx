import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const apiKey = import.meta.env.VITE_API_KEY;

const Movies = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${url}&api_key=${apiKey}`);
        setMovie(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Popular Movies</h2>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movie.map((movies) => {
          const imgPath = movies.poster_path || movies.backdrop_path;
          const imgUrl = imgPath
            ? `https://image.tmdb.org/t/p/w500${imgPath}`
            : "https://via.placeholder.com/500x750?text=No+Image";
          const title = movies.title || movies.name;

          return (
            <Link
              to={`/movie/${movies.id}`}
              key={movies.id}
              className="movie-card rounded-lg overflow-hidden bg-gray-800 hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer"
            >
              <img
                src={imgUrl}
                alt={title}
                className="w-full h-[350px] object-cover"
              />
              <h3 className="text-center text-white p-2 text-sm font-semibold">
                {title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;