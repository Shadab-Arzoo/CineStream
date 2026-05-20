import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import "../CSS/moviecarousel.css";
import { getImageUrl, getTrendingMovies } from '../api/tmdb';

const Moviecarousel = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);
        const data = await getTrendingMovies(1);
        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (isLoading) {
    return <p className="py-8 text-center text-zinc-400">Loading trending movies…</p>;
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={18}
        slidesPerView="auto"
        navigation
        scrollbar={{ draggable: true }}
        freeMode={true}
        loop={false}
      >
        {movies.map((movie) => {
          const imgPath = movie.poster_path || movie.backdrop_path;
          const imgUrl = getImageUrl(imgPath, "w500") || 'https://via.placeholder.com/500x750?text=No+Image';
          const title = movie.title || movie.name;

          return (
            <SwiperSlide className="Movie" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={imgUrl}
                  alt={title}
                  className="rounded-xl transition duration-300 hover:opacity-80"
                />
                <p className="mt-2 text-center text-sm font-semibold text-zinc-100">{title}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Moviecarousel;
