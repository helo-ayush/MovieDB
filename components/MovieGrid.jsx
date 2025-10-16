// MovieGrid: displays a horizontally scrollable row of movie cards for a given section title.
// Now fetches real movie data from TMDB API with loading states and error handling.
import { useMemo } from 'react';
import MovieCard from './MovieCard';
import { useNowPlayingMovies, useTopRatedMovies, usePopularMovies, useUpcomingMovies, useTrendingMovies, usePopularTv, useTopRatedTv, useTrendingTv } from '../hooks/useMovies';

export default function MovieGrid({ title = "Now Playing", contentType = 'movie', filterGenreId = null }) {
    // Map title + content type to appropriate hook
    const getMoviesHook = (title) => {
        const t = title.toLowerCase();
        if (contentType === 'tv') {
            if (t.includes('popular')) return usePopularTv();
            if (t.includes('top rated')) return useTopRatedTv();
            if (t.includes('trending')) return useTrendingTv();
            return usePopularTv();
        }
        if (t.includes('now playing')) return useNowPlayingMovies();
        if (t.includes('top rated')) return useTopRatedMovies();
        if (t.includes('popular')) return usePopularMovies();
        if (t.includes('upcoming')) return useUpcomingMovies();
        if (t.includes('trending')) return useTrendingMovies();
        return useNowPlayingMovies();
    };

    const { movies, loading, error } = getMoviesHook(title);

    // Show loading state
    if (loading) {
        const loadingCards = Array.from({ length: 8 }, (_, i) => (
            <MovieCard key={`loading-${i}`} loading={true} />
        ));

        return (
            <div className="movie-grid-section">
                <div className="section-header">
                    <h2 className="section-title">{title}</h2>
                    <div className="section-line"></div>
                </div>
                <div className="movie-grid">
                    {loadingCards}
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="movie-grid-section">
                <div className="section-header">
                    <h2 className="section-title">{title}</h2>
                    <div className="section-line"></div>
                </div>
                <div className="error-state">
                    <p>Failed to load movies. Please try again later.</p>
                </div>
            </div>
        );
    }

    // Show movies
    return (
        <div className="movie-grid-section">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <div className="section-line"></div>
            </div>
            <div className="movie-grid">
                {movies
                  .filter(m => !filterGenreId || (m.genreIds || m.genre_ids || []).includes(filterGenreId))
                  .map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
            </div>

            <style jsx>{`
                .movie-grid-section {
                    margin-bottom: 4rem;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 2rem;
                    gap: 1rem;
                }

                .section-title {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                    white-space: nowrap;
                }

                .section-line {
                    flex: 1;
                    height: 2px;
                    background: linear-gradient(90deg, var(--accent-primary) 0%, transparent 100%);
                    border-radius: 1px;
                }

                .movie-grid {
                    display: flex;
                    gap: 1.5rem;
                    overflow-x: auto;
                    padding: 1rem 0;
                    scroll-behavior: smooth;
                }

                .movie-grid::-webkit-scrollbar {
                    height: 6px;
                }

                .movie-grid::-webkit-scrollbar-track {
                    background: var(--bg-secondary);
                    border-radius: 3px;
                }

                .movie-grid::-webkit-scrollbar-thumb {
                    background: var(--accent-primary);
                    border-radius: 3px;
                }

                .movie-grid::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-secondary);
                }

                .error-state {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: var(--text-muted);
                }

                .error-state p {
                    font-size: 1.1rem;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 1.5rem;
                    }

                    .movie-grid {
                        gap: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}