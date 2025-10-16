// Custom hooks for fetching movie data
// Provides loading states, error handling, and data management
import { useState, useEffect, useCallback } from 'react';
import { movieAPI, tvAPI, formatMovieData } from '../lib/tmdb';

// Generic hook for fetching movies
export function useMovies(fetchFunction, dependencies = []) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchFunction(pageNum);
      const formattedMovies = response.results.map(formatMovieData);
      
      if (append) {
        setMovies(prev => [...prev, ...formattedMovies]);
      } else {
        setMovies(formattedMovies);
      }
      
      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMovies(page + 1, true);
    }
  }, [loading, hasMore, page, fetchMovies]);

  const refresh = useCallback(() => {
    fetchMovies(1, false);
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    page
  };
}

// Specific hooks for different movie categories
export function useNowPlayingMovies() {
  return useMovies(movieAPI.getNowPlaying, []);
}

export function useTopRatedMovies() {
  return useMovies(movieAPI.getTopRated, []);
}

export function usePopularMovies() {
  return useMovies(movieAPI.getPopular, []);
}

export function useUpcomingMovies() {
  return useMovies(movieAPI.getUpcoming, []);
}

export function useTrendingMovies() {
  return useMovies(movieAPI.getTrending, []);
}

// TV hooks (formatted to movie-like shape for grids)
const formatTvAsMovie = (tv) => ({
  id: tv.id,
  title: tv.name,
  originalTitle: tv.original_name,
  overview: tv.overview,
  releaseDate: tv.first_air_date,
  year: tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : null,
  rating: tv.vote_average,
  voteCount: tv.vote_count,
  popularity: tv.popularity,
  adult: tv.adult,
  genreIds: tv.genre_ids || [],
  posterPath: tv.poster_path,
  backdropPath: tv.backdrop_path,
  originalLanguage: tv.original_language,
});

export function usePopularTv() {
  return useMovies(async (page) => {
    const res = await tvAPI.getPopular(page);
    return { ...res, results: res.results.map(formatTvAsMovie) };
  }, []);
}

export function useTopRatedTv() {
  return useMovies(async (page) => {
    const res = await tvAPI.getTopRated(page);
    return { ...res, results: res.results.map(formatTvAsMovie) };
  }, []);
}

export function useTrendingTv() {
  return useMovies(async (page) => {
    const res = await tvAPI.getTrending('week', page);
    return { ...res, results: res.results.map(formatTvAsMovie) };
  }, []);
}

// Hook for searching movies
export function useMovieSearch(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = useCallback(async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await movieAPI.searchMovies(searchQuery, page);
      const formattedMovies = response.results.map(formatMovieData);
      setMovies(formattedMovies);
    } catch (err) {
      setError(err.message);
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchMovies(query);
      } else {
        setMovies([]);
      }
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, searchMovies]);

  return {
    movies,
    loading,
    error,
    searchMovies
  };
}

// Hook for movie details
export function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieDetails = useCallback(async (id) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await movieAPI.getMovieDetails(id);
      setMovie(formatMovieData(response));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, [movieId, fetchMovieDetails]);

  return {
    movie,
    loading,
    error,
    refetch: () => fetchMovieDetails(movieId)
  };
}
