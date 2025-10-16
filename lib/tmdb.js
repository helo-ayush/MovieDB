// TMDB API Service
// Handles all API calls to The Movie Database
// TODO: Add rate limiting and caching for better performance

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Image size configurations
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  }
};

// API request helper
async function tmdbRequest(endpoint, params = {}) {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);
  
  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('TMDB API Request Failed:', error);
    throw error;
  }
}

// Movie API functions
export const movieAPI = {
  // Get movies by category
  getNowPlaying: (page = 1) => 
    tmdbRequest('/movie/now_playing', { page }),
  
  getTopRated: (page = 1) => 
    tmdbRequest('/movie/top_rated', { page }),
  
  getPopular: (page = 1) => 
    tmdbRequest('/movie/popular', { page }),
  
  getUpcoming: (page = 1) => 
    tmdbRequest('/movie/upcoming', { page }),
  
  // Get trending movies
  getTrending: (timeWindow = 'week', page = 1) => 
    tmdbRequest('/trending/movie/week', { page }),
  
  // Get movie details
  getMovieDetails: (movieId) => 
    tmdbRequest(`/movie/${movieId}`),
  
  // Get movie credits
  getMovieCredits: (movieId) => 
    tmdbRequest(`/movie/${movieId}/credits`),
  
  // Get watch providers (JustWatch data via TMDB)
  getMovieProviders: (movieId) =>
    tmdbRequest(`/movie/${movieId}/watch/providers`),
  
  // Search movies
  searchMovies: (query, page = 1) => 
    tmdbRequest('/search/movie', { query, page }),
  
  // Get movie genres
  getGenres: () => 
    tmdbRequest('/genre/movie/list'),
};

// TV Shows API functions
export const tvAPI = {
  getPopular: (page = 1) => 
    tmdbRequest('/tv/popular', { page }),
  
  getTopRated: (page = 1) => 
    tmdbRequest('/tv/top_rated', { page }),
  
  getTrending: (timeWindow = 'week', page = 1) => 
    tmdbRequest('/trending/tv/week', { page }),
  
  // Get TV genres
  getGenres: () =>
    tmdbRequest('/genre/tv/list'),
};

// Utility functions
export const getImageUrl = (path, size = 'medium', type = 'poster') => {
  if (!path) return '/placeholder-movie.jpg';
  
  const sizeKey = IMAGE_SIZES[type]?.[size] || IMAGE_SIZES.poster.medium;
  return `${TMDB_IMAGE_BASE_URL}/${sizeKey}${path}`;
};

export const formatMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  originalTitle: movie.original_title,
  overview: movie.overview,
  releaseDate: movie.release_date,
  year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
  rating: movie.vote_average,
  voteCount: movie.vote_count,
  popularity: movie.popularity,
  adult: movie.adult,
  genreIds: movie.genre_ids || [],
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  originalLanguage: movie.original_language,
  video: movie.video,
});

// Error handling
export class TMDBError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'TMDBError';
    this.status = status;
    this.endpoint = endpoint;
  }
}
