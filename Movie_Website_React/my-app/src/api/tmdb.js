import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

if (!apiKey) {
  console.error("Missing VITE_TMDB_API_KEY in environment variables.");
}

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3",
});

const withApiKey = (params = {}) => ({
  api_key: apiKey,
  language: "en-US",
  ...params,
});

const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

export const getImageUrl = (path, size = "w500") =>
  path ? `${imageBaseUrl}${size}${path}` : "";

export const getTrendingMovies = async (page = 1) => {
  const res = await tmdb.get("/trending/movie/week", {
    params: withApiKey({ page }),
  });
  return res.data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const res = await tmdb.get("/movie/now_playing", {
    params: withApiKey({ page }),
  });
  return res.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const res = await tmdb.get("/movie/upcoming", {
    params: withApiKey({ page }),
  });
  return res.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const res = await tmdb.get("/movie/top_rated", {
    params: withApiKey({ page }),
  });
  return res.data;
};

export const getPopularMovies = async (page = 1, genreId) => {
  const res = await tmdb.get("/discover/movie", {
    params: withApiKey({
      include_adult: false,
      include_video: false,
      sort_by: "popularity.desc",
      page,
      with_genres: genreId || undefined,
    }),
  });
  return res.data;
};

export const searchMovies = async (query, page = 1) => {
  const res = await tmdb.get("/search/movie", {
    params: withApiKey({
      query,
      page,
      include_adult: false,
    }),
  });
  return res.data;
};

export const searchMulti = async (query, page = 1) => {
  const res = await tmdb.get("/search/multi", {
    params: withApiKey({
      query,
      page,
      include_adult: false,
    }),
  });
  return res.data;
};

export const getMediaDetails = async (mediaType, id) => {
  const res = await tmdb.get(`/${mediaType}/${id}`, {
    params: withApiKey(),
  });
  return res.data;
};

export const getMediaVideos = async (mediaType, id) => {
  const res = await tmdb.get(`/${mediaType}/${id}/videos`, {
    params: withApiKey(),
  });
  return res.data;
};

export const getMediaCredits = async (mediaType, id) => {
  const res = await tmdb.get(`/${mediaType}/${id}/credits`, {
    params: withApiKey(),
  });
  return res.data;
};

export const getMediaRecommendations = async (mediaType, id, page = 1) => {
  const res = await tmdb.get(`/${mediaType}/${id}/recommendations`, {
    params: withApiKey({ page }),
  });
  return res.data;
};

export const getMediaWatchProviders = async (mediaType, id) => {
  const res = await tmdb.get(`/${mediaType}/${id}/watch/providers`, {
    params: withApiKey(),
  });
  return res.data;
};

// Backward-compatible wrappers
export const getMovieDetails = (id) => getMediaDetails("movie", id);
export const getMovieVideos = (id) => getMediaVideos("movie", id);

export const getGenres = async () => {
  const res = await tmdb.get("/genre/movie/list", {
    params: withApiKey(),
  });
  return res.data;
};


export const getTvSeasonDetails = async (tvId, seasonNumber) => {
  const res = await tmdb.get(`/tv/${tvId}/season/${seasonNumber}`, {
    params: withApiKey(),
  });
  return res.data;
};
