import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getImageUrl,
  getMediaCredits,
  getMediaDetails,
  getMediaRecommendations,
  getMediaVideos,
  getMediaWatchProviders,
} from "../api/tmdb";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

function Detailspage({ mediaType = "movie" }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError("");
        const [movieData, videosData, creditsData, recData, providersData] = await Promise.all([
          getMediaDetails(mediaType, id),
          getMediaVideos(mediaType, id),
          getMediaCredits(mediaType, id),
          getMediaRecommendations(mediaType, id, 1),
          getMediaWatchProviders(mediaType, id),
        ]);

        setMovie(movieData);
        const trailer = (videosData.results || []).find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailerKey(trailer?.key || "");
        setCast((creditsData.cast || []).slice(0, 8));
        setRecommendations((recData.results || []).slice(0, 8));

        const regionalProviders =
          providersData.results?.US?.flatrate ||
          providersData.results?.US?.rent ||
          providersData.results?.US?.buy ||
          [];
        setProviders(regionalProviders.slice(0, 6));
      } catch (error) {
        setError("Could not load details.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id, mediaType]);

  if (isLoading) return <div className="py-16 text-center text-white">Loading details…</div>;
  if (error) return <div className="py-16 text-center text-red-300">{error}</div>;
  if (!movie) return <div className="py-16 text-center text-white">Item not found.</div>;

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date || "Unknown release";

  return (
    <div className="bg-black text-white">
      <div
        className="border-b border-white/10"
        style={{
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.95)), url(${getImageUrl(movie.backdrop_path, "original")})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <img
              src={getImageUrl(movie.poster_path, "w500") || "https://via.placeholder.com/500x750?text=No+Image"}
              alt={title}
              className="w-full max-w-[320px] rounded-xl border border-white/20 object-cover shadow-xl"
            />

            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
              <p className="mt-2 text-zinc-300">
                {releaseDate} • ⭐ {movie.vote_average?.toFixed(1) || "N/A"} / 10
              </p>
              <p className="mt-5 text-base leading-relaxed text-zinc-100">{movie.overview || "No overview available."}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {(movie.genres || []).map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-zinc-100"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* ── Watch Now Button ─────────────────────────── */}
              <div className="mt-8 flex flex-wrap gap-3">
                {trailerKey && (
                  <a
                    href={`#trailer`}
                    className="flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    ▶ Trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="trailer" className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <h2 className="mb-4 text-2xl font-bold">Trailer</h2>
        {trailerKey ? (
          <div className="aspect-video overflow-hidden rounded-xl border border-white/10">
            <iframe
              title={`${title} Trailer`}
              src={`https://www.youtube.com/embed/${trailerKey}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-zinc-400">No trailer available.</p>
        )}
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 md:grid-cols-2 md:px-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Top Cast</h2>
          {cast.length === 0 ? (
            <p className="text-zinc-400">No cast information available.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {cast.map((person) => (
                <div key={person.id} className="rounded-lg border border-white/10 bg-zinc-900 p-3">
                  <p className="font-semibold text-white">{person.name}</p>
                  <p className="text-xs text-zinc-400">{person.character || "Cast"}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Watch Providers (US)</h2>
          {providers.length === 0 ? (
            <p className="text-zinc-400">No provider data available.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {providers.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2"
                >
                  <img
                    src={getImageUrl(provider.logo_path, "w92")}
                    alt={provider.provider_name}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <span className="text-sm text-zinc-200">{provider.provider_name}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <h2 className="mb-4 text-2xl font-bold">Recommendations</h2>
        {recommendations.length === 0 ? (
          <p className="text-zinc-400">No recommendations available.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {recommendations.map((item) => (
              <Link
                key={item.id}
                to={`/${mediaType}/${item.id}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition hover:-translate-y-1"
              >
                <img
                  src={getImageUrl(item.poster_path, "w500") || "https://via.placeholder.com/300x450?text=No+Image"}
                  alt={item.title || item.name}
                  className="h-[260px] w-full object-cover"
                />
                <p className="p-3 text-sm font-semibold text-white">{item.title || item.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detailspage;
