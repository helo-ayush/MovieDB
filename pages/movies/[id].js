// Movie detail page: shows a single movie with backdrop, poster, and metadata.
// Now uses our TMDB service with proper error handling and loading states.
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { movieAPI, getImageUrl } from "../../lib/tmdb";
import { useUser } from "@clerk/nextjs";

export default function Page(){
    const router = useRouter();
    const {id} = router.query;

    const [movie, setMovie] = useState(null);
    const [provider, setProvider] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [queries, setQueries] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState('');
    const [queryText, setQueryText] = useState('');
    const { user } = useUser();

    function toggleMyList() {
        if (!user || !movie) return;
        const key = `mylist_${user.id}`;
        const current = JSON.parse(localStorage.getItem(key) || '[]');
        const exists = current.some(m => m.id === movie.id);
        const next = exists ? current.filter(m => m.id !== movie.id) : [...current, {
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
            rating: movie.vote_average,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path
        }];
        localStorage.setItem(key, JSON.stringify(next));
    }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieData = async() => {
            try {
                if (!id) return;
                
                setLoading(true);
                setError(null);
                
                const data = await movieAPI.getMovieDetails(id);
                setMovie(data);
            } catch(err) {
                console.error('Error fetching movie:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieData();
    }, [id])

    // Load reviews and queries for this movie
    useEffect(() => {
        async function load() {
            if (!id) return;
            const [rRes, qRes] = await Promise.all([
                fetch(`/api/reviews?movieId=${id}`),
                fetch(`/api/queries?movieId=${id}`)
            ]);
            setReviews(await rRes.json());
            setQueries(await qRes.json());
        }
        load();
    }, [id])

    useEffect(() => {
        const fetchMovieStreaming = async() => {
            try {
                if (!id) return;
                const data = await movieAPI.getMovieProviders(id);
                setProvider(data);
            } catch(err) {
                console.error('Error fetching providers:', err);
            }
        }

        fetchMovieStreaming();
    }, [id])

    // Loading state
    if (loading) {
        return (
            <div className="movie-detail-loading">
                <div className="loading-spinner"></div>
                <p>Loading movie details...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="movie-detail-error">
                <h2>❌ Error Loading Movie</h2>
                <p>{error}</p>
                <button onClick={() => router.back()}>Go Back</button>
            </div>
        );
    }

    // No movie data
    if (!movie) {
        return (
            <div className="movie-detail-error">
                <h2>🎬 Movie Not Found</h2>
                <p>The movie you're looking for doesn't exist.</p>
                <button onClick={() => router.back()}>Go Back</button>
            </div>
        );
    }

    const posterURL = getImageUrl(movie.poster_path, 'large', 'poster');
    const backdropURL = getImageUrl(movie.backdrop_path, 'original', 'backdrop');

    // Safe array access with fallbacks
    const genres = movie.genres || [];
    const productionCompanies = movie.production_companies || [];
    const firstGenre = genres[0]?.name || 'Unknown';
    const secondGenre = genres[1]?.name || '';
    const genresText = secondGenre ? `${firstGenre}, ${secondGenre}` : firstGenre;
    const productionStudio = productionCompanies[0]?.name || 'Unknown';

    // Providers (prefer IN, fallback to US)
    const providerData = provider?.results?.IN || provider?.results?.US;
    const flatrate = providerData?.flatrate || [];
    const buy = providerData?.buy || [];
    const rent = providerData?.rent || [];

    const styles = {
        backdrop:{
            backgroundImage: `url(${backdropURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh', 
            padding: '2rem',
            color: 'white',
            position: 'relative',
        },
        overlay:{
            display:'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '100vw',
            margin: '0 auto',
        },
        poster:{
            width: '300px',
            height: '450px',
        },
        rating:{
            color: '#E0E0E0',
            fontSize: '1.45rem',
            fontFamily: `'Lora',sans-serif`,
            marginTop: '20px',
            marginBottom: '25px',
            fontWeight: 600
        },
        infoDiv:{
            marginLeft: '50px',
            color: '#F1F1F1',
            fontFamily: `'Poppins',sans-serif`,
        },
        title:{
            fontSize:'4rem',
            marginTop: '0px',
            marginBottom: '10px'
        },
        text:{
            marginTop:'25px',
            fontWeight:'500',
        },
        text2:{
            fontWeight:'500',
        }
    }

    return(
    <> 
        <div style={styles.backdrop}>
            <div style={styles.overlay}>
                <div style={{width:'300px'}}>
                    <img src={posterURL} style={styles.poster} alt={movie.title}></img>
                </div>
                <div style={styles.infoDiv}>
                    <h1 style={styles.title}>{movie.title}</h1>
                    <h2 style={styles.rating}>Rating : {movie.vote_average?.toFixed(1) || 'N/A'}/10</h2>
                    <h3 style={{fontWeight:500}}>{movie.overview}</h3>
                    <h2 style={styles.text}>Release Date : {movie.release_date || 'Unknown'}</h2>
                    <h2 style={styles.text2}>Genre : {genresText}</h2>
                    <h2 style={styles.text2}>Status : {movie.status || 'Unknown'}</h2>
                    <h2 style={styles.text2}>Runtime : {movie.runtime || 'Unknown'} min</h2>
                    <h2 style={styles.text2}>Production Studio: {productionStudio}</h2>
                    <button className="btn-secondary" onClick={toggleMyList} style={{marginTop:'12px'}}>Add/Remove My List</button>
                    <div className="providers">
                        <h2 className="providers-title">Where to watch</h2>
                        {(!flatrate.length && !buy.length && !rent.length) ? (
                            <p className="providers-empty">Not available from supported providers in your region.</p>
                        ) : (
                            <div className="providers-groups">
                                {flatrate.length > 0 && (
                                    <div className="providers-group">
                                        <h4>Stream</h4>
                                        <div className="providers-list">
                                            {flatrate.map(p => (
                                                <div key={`flat-${p.provider_id}`} className="provider-chip" title={p.provider_name}>
                                                    <img src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} alt={p.provider_name} />
                                                    <span>{p.provider_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {rent.length > 0 && (
                                    <div className="providers-group">
                                        <h4>Rent</h4>
                                        <div className="providers-list">
                                            {rent.map(p => (
                                                <div key={`rent-${p.provider_id}`} className="provider-chip" title={p.provider_name}>
                                                    <img src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} alt={p.provider_name} />
                                                    <span>{p.provider_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {buy.length > 0 && (
                                    <div className="providers-group">
                                        <h4>Buy</h4>
                                        <div className="providers-list">
                                            {buy.map(p => (
                                                <div key={`buy-${p.provider_id}`} className="provider-chip" title={p.provider_name}>
                                                    <img src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} alt={p.provider_name} />
                                                    <span>{p.provider_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </div>

        <style jsx>{`
            .movie-detail-loading {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: var(--bg-primary);
                color: var(--text-primary);
            }

            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--border-color);
                border-top: 4px solid var(--accent-primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .movie-detail-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: var(--bg-primary);
                color: var(--text-primary);
                text-align: center;
                padding: 2rem;
            }

            .movie-detail-error h2 {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: var(--accent-primary);
            }

            .movie-detail-error p {
                font-size: 1.1rem;
                margin-bottom: 2rem;
                color: var(--text-secondary);
            }

            .movie-detail-error button {
                background: var(--accent-gradient);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: var(--radius-md);
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all var(--transition-normal);
            }

            .movie-detail-error button:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-md);
            }

            @media (max-width: 768px) {
                .movie-detail-error h2 {
                    font-size: 1.5rem;
                }

                .movie-detail-error p {
                    font-size: 1rem;
                }
            }
            .providers { margin-top: 24px; }
            .providers-title { margin: 0 0 8px 0; font-weight: 600; }
            .providers-empty { color: var(--text-secondary); margin: 0; }
            .providers-groups { display: grid; gap: 16px; }
            .providers-group h4 { margin: 0 0 8px 0; color: var(--text-primary); }
            .providers-list { display: flex; flex-wrap: wrap; gap: 10px; }
            .provider-chip { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid var(--border-color); border-radius: 999px; background: var(--bg-card); }
            .provider-chip img { width: 24px; height: 24px; border-radius: 4px; object-fit: cover; }
            .provider-chip span { color: var(--text-secondary); font-size: 0.9rem; }
        `}</style>
    </>);
}