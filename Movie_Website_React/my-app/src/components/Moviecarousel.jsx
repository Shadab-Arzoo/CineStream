import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import "../CSS/moviecarousel.css";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const Moviecarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${baseUrl}/week`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: 1,
          },
        });
        setMovies(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="w-full h-[400px]">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView="auto"
        navigation
        scrollbar={{ draggable: true }}
        freeMode={true}
        loop={false}
      >
        {movies.map((movie) => {
          const imgPath = movie.poster_path || movie.backdrop_path;
          const imgUrl = imgPath
            ? `https://image.tmdb.org/t/p/w500${imgPath}`
            : 'https://via.placeholder.com/500x750?text=No+Image';
          const title = movie.title || movie.name;

          return (
            <SwiperSlide className="Movie" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={imgUrl}
                  alt={title}
                  className="rounded-xl transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Moviecarousel;