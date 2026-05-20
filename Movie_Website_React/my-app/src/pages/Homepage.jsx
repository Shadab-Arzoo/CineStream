import { FaPlay } from "react-icons/fa";
import Moviecarousel from "../components/Moviecarousel";
import Movies from "../components/movies";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImageUrl, getTrendingMovies } from "../api/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Homepage = () => {
  const [searchParams] = useSearchParams();
  const [heroMovies, setHeroMovies] = useState([]);

  const feed = searchParams.get("feed") || "popular";
  const genreId = searchParams.get("genre") || "";

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getTrendingMovies(1);
        setHeroMovies((data.results || []).slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-black text-white">
      <section className="border-b border-white/10">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={heroMovies.length > 1}
        >
          {heroMovies.length === 0 && (
            <SwiperSlide>
              <div className="flex min-h-[70vh] items-center justify-center bg-zinc-950">
                <p className="text-zinc-400">Loading featured movies…</p>
              </div>
            </SwiperSlide>
          )}
          {heroMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="min-h-[70vh] px-6 md:px-12"
                style={{
                  backgroundImage: movie.backdrop_path
                    ? `linear-gradient(110deg, rgba(0,0,0,0.95), rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${getImageUrl(movie.backdrop_path, "original")})`
                    : "linear-gradient(110deg, rgba(0,0,0,0.95), rgba(24,24,27,1), rgba(0,0,0,0.9))",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center">
                  <div className="max-w-2xl py-16">
                    <p className="mb-3 inline-block rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black">
                      Featured
                    </p>
                    <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                      {movie.title || movie.name}
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-zinc-200 md:text-lg">
                      {movie.overview || "Explore this title in full detail."}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to={`/movie/${movie.id}#trailer`}
                        className="flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-white"
                      >
                        <FaPlay /> Watch Trailer
                      </Link>
                      <Link
                        to={`/movie/${movie.id}`}
                        className="rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-2 md:px-8">
        <h2 className="mb-5 text-2xl font-bold text-white">Trending This Week</h2>
        <Moviecarousel />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <Movies feed={feed} genreId={genreId} />
      </section>
    </div>
  );
};

export default Homepage;
