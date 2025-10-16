// SearchBar: controlled input that visually expands when focused (via parent `Layout`).
// Now includes real-time search with TMDB API integration and search suggestions.
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import { useMovieSearch } from '../hooks/useMovies';

export default function SearchBar({ isFocused, onFocus, onBlur }){

    const [isHovered, setHover] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const suggestionsRef = useRef(null);
    const router = useRouter();

    const { movies, loading: searchLoading } = useMovieSearch(searchValue);

    function onMouseEnter(){setHover(true)}
    function onMouseLeave(){setHover(false)}

    // Handle click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
                searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Show suggestions when there are search results
    useEffect(() => {
        setShowSuggestions(searchValue.length > 0 && movies.length > 0);
    }, [searchValue, movies]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSuggestionClick = (movie) => {
        setSearchValue('');
        setShowSuggestions(false);
        if (movie?.id) {
            router.push(`/movies/${movie.id}`);
        }
    };

    return(
        <div className="search-container">
            <div className="search-input-wrapper">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
        <input
                    ref={searchRef}
                    className="search-input"
                    placeholder="Search movies, TV shows..."
                    value={searchValue}
                    onChange={handleSearchChange}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
                    onFocus={(e) => {
                        onFocus();
                        if (searchValue.length > 0 && movies.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
            onBlur={onBlur}
                />
                {searchValue && (
                    <button 
                        className="clear-button"
                        onClick={() => setSearchValue('')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
                <div ref={suggestionsRef} className="search-suggestions">
                    {searchLoading ? (
                        <div className="suggestion-item loading">
                            <div className="loading-spinner"></div>
                            <span>Searching...</span>
                        </div>
                    ) : movies.length > 0 ? (
                        movies.slice(0, 5).map(movie => (
                            <div 
                                key={movie.id} 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(movie)}
                            >
                                <div className="suggestion-poster">
                                    {movie.posterPath ? (
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w92${movie.posterPath}`}
                                            alt={movie.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="suggestion-placeholder">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 6H20V18H4V6ZM2 4V20H22V4H2ZM6 8H18V16H6V8Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="suggestion-info">
                                    <div className="suggestion-title">{movie.title}</div>
                                    <div className="suggestion-year">{movie.year}</div>
                                </div>
                                {movie.rating > 0 && (
                                    <div className="suggestion-rating">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                                        </svg>
                                        <span>{movie.rating.toFixed(1)}</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="suggestion-item no-results">
                            <span>No movies found</span>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                .search-container {
                    position: relative;
                    z-index: 10;
                }

                .search-input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    background: var(--bg-card);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: 0.75rem 1rem;
                    transition: all var(--transition-normal);
                    backdrop-filter: blur(10px);
                    box-shadow: var(--shadow-sm);
                    min-width: 300px;
                    max-width: 500px;
                }

                .search-input-wrapper:hover {
                    border-color: var(--accent-primary);
                    box-shadow: var(--shadow-md);
                }

                .search-input-wrapper:focus-within {
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
                    transform: translateY(-2px);
                }

                .search-icon {
                    color: var(--text-muted);
                    margin-right: 0.75rem;
                    flex-shrink: 0;
                    transition: color var(--transition-fast);
                }

                .search-input-wrapper:focus-within .search-icon {
                    color: var(--accent-primary);
                }

                .search-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    color: var(--text-primary);
                    font-size: 1rem;
                    font-weight: 400;
                    width: 100%;
                }

                .search-input::placeholder {
                    color: var(--text-muted);
                }

                .clear-button {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: var(--radius-sm);
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 0.5rem;
                }

                .clear-button:hover {
                    color: var(--text-primary);
                    background: var(--bg-hover);
                }

                .search-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-lg);
                    max-height: 400px;
                    overflow-y: auto;
                    z-index: 1000;
                    margin-top: 0.5rem;
                }

                .suggestion-item {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    transition: background-color var(--transition-fast);
                    border-bottom: 1px solid var(--border-color);
                }

                .suggestion-item:last-child {
                    border-bottom: none;
                }

                .suggestion-item:hover {
                    background: var(--bg-hover);
                }

                .suggestion-item.loading {
                    justify-content: center;
                    gap: 0.5rem;
                    color: var(--text-muted);
                }

                .suggestion-item.no-results {
                    justify-content: center;
                    color: var(--text-muted);
                    font-style: italic;
                }

                .suggestion-poster {
                    width: 40px;
                    height: 60px;
                    border-radius: var(--radius-sm);
                    overflow: hidden;
                    margin-right: 0.75rem;
                    flex-shrink: 0;
                }

                .suggestion-poster img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .suggestion-placeholder {
                    width: 100%;
                    height: 100%;
                    background: var(--bg-tertiary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                }

                .suggestion-info {
                    flex: 1;
                    min-width: 0;
                }

                .suggestion-title {
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 0.25rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .suggestion-year {
                    font-size: 0.875rem;
                    color: var(--text-muted);
                }

                .suggestion-rating {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: var(--accent-primary);
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-left: 0.5rem;
                }

                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid var(--border-color);
                    border-top: 2px solid var(--accent-primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .search-input-wrapper {
                        min-width: 250px;
                        max-width: 100%;
                    }

                    .search-suggestions {
                        max-height: 300px;
                    }

                    .suggestion-item {
                        padding: 0.5rem;
                    }

                    .suggestion-poster {
                        width: 32px;
                        height: 48px;
                        margin-right: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
    

    