// MovieCard: a single movie item with poster/title space and hover interaction.
// Now supports real movie data from TMDB API with proper image handling and ratings.
import { useState } from "react";
import { useRouter } from "next/router";
import { getImageUrl } from "../lib/tmdb";

export default function MovieCard({ movie, placeholder = false, loading = false }) {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);

    const handleClick = () => {
        if (movie?.id) {
            router.push(`/movies/${movie.id}`);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Loading skeleton
    if (loading || placeholder) {
        return (
            <div className="movie-card placeholder">
                <div className="movie-poster">
                    <div className="skeleton-poster"></div>
                    <div className="play-overlay">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
                <div className="movie-info">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-rating"></div>
                </div>
            </div>
        );
    }

    // No movie data
    if (!movie) {
        return null;
    }

    const posterUrl = movie.posterPath 
        ? getImageUrl(movie.posterPath, 'medium', 'poster')
        : '/placeholder-movie.jpg';

    const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A';
    const year = movie.year || 'N/A';

    return (
        <div className="movie-card" onClick={handleClick}>
            <div className="movie-poster">
                {!imageError ? (
                    <img 
                        src={posterUrl}
                        alt={movie.title}
                        className="poster-image"
                        onError={handleImageError}
                        loading="lazy"
                    />
                ) : (
                    <div className="poster-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6H20V18H4V6ZM2 4V20H22V4H2ZM6 8H18V16H6V8Z" fill="currentColor"/>
                        </svg>
                    </div>
                )}
                
                <div className="play-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                </div>
                
                {movie.rating > 0 && (
                    <div className="rating-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                        </svg>
                        <span>{rating}</span>
                    </div>
                )}
            </div>
            
            <div className="movie-info">
                <h3 className="movie-title" title={movie.title}>
                    {movie.title}
                </h3>
                <p className="movie-year">{year}</p>
            </div>

            <style jsx>{`
                .movie-card {
                    min-width: 200px;
                    max-width: 200px;
                    cursor: pointer;
                    transition: all var(--transition-normal);
                }

                .movie-card:hover {
                    transform: translateY(-8px);
                }

                .movie-poster {
                    position: relative;
                    width: 200px;
                    height: 300px;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    background: var(--bg-card);
                    box-shadow: var(--shadow-sm);
                    transition: all var(--transition-normal);
                }

                .movie-card:hover .movie-poster {
                    box-shadow: var(--shadow-lg);
                }

                .poster-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-card) 100%);
                }

                .poster-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-tertiary);
                    color: var(--text-muted);
                }

                .play-overlay {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    opacity: 0;
                    transition: all var(--transition-normal);
                    backdrop-filter: blur(10px);
                }

                .movie-card:hover .play-overlay {
                    opacity: 1;
                }

                .rating-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: var(--accent-gradient);
                    color: white;
                    padding: 4px 8px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    box-shadow: var(--shadow-sm);
                }

                .movie-info {
                    padding: 1rem 0.5rem 0;
                }

                .movie-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 0.25rem 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .movie-year {
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    margin: 0;
                }

                /* Placeholder styles */
                .movie-card.placeholder .movie-poster {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                }

                .skeleton-poster {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-hover) 50%, var(--bg-tertiary) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }

                .skeleton-title {
                    width: 80%;
                    height: 16px;
                    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-hover) 50%, var(--bg-tertiary) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: var(--radius-sm);
                    margin-bottom: 0.5rem;
                }

                .skeleton-rating {
                    width: 40%;
                    height: 12px;
                    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-hover) 50%, var(--bg-tertiary) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: var(--radius-sm);
                }

                @media (max-width: 768px) {
                    .movie-card {
                        min-width: 160px;
                        max-width: 160px;
                    }

                    .movie-poster {
                        width: 160px;
                        height: 240px;
                    }
                }
            `}</style>
            </div>
    );
}