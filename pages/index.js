// Home page: renders a beautiful landing page with hero section and movie grids.
// Features a modern dark theme with engaging visuals and smooth animations.
// TODO: Add server-side data fetching or client-side hooks to populate grids.
import { useState, useEffect } from 'react';
import MovieGrid from "@/components/MovieGrid";

import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return(
    <div className="landing-page">
      {/* Public marketing hero */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className={`hero-title ${isLoaded ? 'animate-in' : ''}`}>
                Discover and Track
                <span className="gradient-text"> Movies</span>
              </h1>
              <p className={`hero-subtitle ${isLoaded ? 'animate-in' : ''}`}>
                Ratings, reviews, watch providers and more — all in one place.
              </p>
              <div className={`hero-actions ${isLoaded ? 'animate-in' : ''}`}>
                <a className="btn-primary" href="/sign-up">Create free account</a>
                <a className="btn-secondary" href="/sign-in">Sign in</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Everything you need</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Real-time Catalog</h3>
              <p>Live data from TMDB: popular, top-rated, now playing, and upcoming.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Beautiful UI</h3>
              <p>Dark theme, smooth animations, and responsive layouts out of the box.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Search that works</h3>
              <p>Instant suggestions to quickly find any title you love.</p>
            </div>
          </div>
        </div>
      </section>

      <SignedIn>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-particles">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className={`hero-title ${isLoaded ? 'animate-in' : ''}`}>
                Discover Amazing
                <span className="gradient-text"> Movies</span>
              </h1>
              <p className={`hero-subtitle ${isLoaded ? 'animate-in' : ''}`}>
                Explore thousands of movies and TV shows. Find your next favorite with our 
                intelligent recommendations and detailed reviews.
              </p>
              <div className={`hero-actions ${isLoaded ? 'animate-in' : ''}`}>
                <button className="btn-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                  Start Watching
                </button>
                <button className="btn-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  Browse Trending
                </button>
              </div>
            </div>
            
            <div className={`hero-stats ${isLoaded ? 'animate-in' : ''}`}>
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Movies</div>
              </div>
              <div className="stat">
                <div className="stat-number">5K+</div>
                <div className="stat-label">TV Shows</div>
              </div>
              <div className="stat">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose MovieDB?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Curated Collections</h3>
              <p>Hand-picked movie collections by our experts to help you discover hidden gems.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Recommendations</h3>
              <p>AI-powered suggestions based on your viewing history and preferences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Optimized for speed with instant search and seamless streaming experience.</p>
            </div>
          </div>
        </div>
      </section>
      </SignedIn>

      {/* Movie Sections */}
      <section className="movie-sections">
        <div className="container">
          <MovieGrid title="Now Playing"/>
          <MovieGrid title="Top Rated"/>
          <MovieGrid title="Popular"/>
          <MovieGrid title="Upcoming"/>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%);
        }

        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--accent-primary);
          border-radius: 50%;
          animation: float linear infinite;
          opacity: 0.6;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-text {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .hero-title.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease 0.2s;
        }

        .hero-subtitle.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease 0.4s;
        }

        .hero-actions.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-actions .btn-primary,
        .hero-actions .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease 0.6s;
        }

        .hero-stats.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 1rem;
          font-weight: 500;
        }

        .features {
          padding: 6rem 0;
          background: var(--bg-secondary);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: var(--bg-card);
          padding: 2.5rem 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all var(--transition-normal);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-primary);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .movie-sections {
          padding: 4rem 0;
        }

        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .hero-stats {
            gap: 2rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
