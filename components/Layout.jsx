// Layout: wraps all pages with a consistent header, main content area, and footer.
// Includes a focus-aware overlay tied to the `SearchBar` to create a spotlight effect.
// TODO: Improve accessibility (ARIA roles/labels for header/main/footer, skip links).
// TODO: Consider extracting inline styles to CSS for easier theming and maintenance.
// TODO: Make header responsive on small screens (collapse/stack elements, reduce blur overlays).
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import {useState} from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Layout({ children }) {

  const [focused, setFocused] = useState(false);
  const router = useRouter();

  function handleFocus(){
    setFocused(true);
  }
  function handleBlur(){
    setFocused(false);
  }

  return (
    <>
      <Head>
        <title>MovieDB - Discover Amazing Movies</title>
        <meta name="description" content="Discover and explore your favorite movies and TV shows with MovieDB. Find ratings, reviews, and recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1 className="logo-text">MovieDB</h1>
            <div className="logo-accent"></div>
          </div>
          
          <nav className="nav">
            <Link href="/app" className={`nav-link ${router.pathname === '/app' ? 'active' : ''}`}>Movies</Link>
            <Link href="/tv" className={`nav-link ${router.pathname === '/tv' ? 'active' : ''}`}>TV Shows</Link>
            <Link href="/trending" className={`nav-link ${router.pathname === '/trending' ? 'active' : ''}`}>Trending</Link>
            <SignedIn>
              <Link href="/my-list" className={`nav-link ${router.pathname === '/my-list' ? 'active' : ''}`}>My List</Link>
              <UserButton appearance={{ elements: { avatarBox: 'user-avatar' } }} />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="nav-link">Sign In</Link>
            </SignedOut>
          </nav>

          <SearchBar 
            isFocused={focused}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {focused && (
          <div className="search-overlay"></div>
        )}
      </header>

      <main className="main">
        {children}
        {focused && (
          <div className="main-overlay"></div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MovieDB</h3>
            <p>Your ultimate destination for discovering amazing movies and TV shows.</p>
          </div>
          <div className="footer-section">
            <h4>Browse</h4>
            <ul>
              <li><a href="#">Top Rated</a></li>
              <li><a href="#">Popular</a></li>
              <li><a href="#">Now Playing</a></li>
              <li><a href="#">Upcoming</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MovieDB. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          transition: all var(--transition-normal);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }

        .logo-text {
          font-size: 1.8rem;
          font-weight: 800;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          animation: slideInLeft 0.6s ease;
        }

        .logo-accent {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          animation: float 2s ease-in-out infinite;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        /* Ensure anchor states are fully styled */
        .nav .nav-link,
        .nav .nav-link:link,
        .nav .nav-link:visited {
          color: var(--text-secondary) !important;
          text-decoration: none !important;
          font-weight: 600;
          transition: color var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
          position: relative;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--border-color);
          background: transparent;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          will-change: transform, background, color, border-color, box-shadow;
          overflow: hidden;
        }

        .nav .nav-link:hover,
        .nav .nav-link:active {
          color: var(--text-primary) !important;
          text-decoration: none !important;
          background: var(--bg-hover);
          border-color: var(--accent-primary);
          transform: translateY(-1px);
        }

        .nav .nav-link.active,
        .nav .nav-link.active:visited {
          color: var(--text-primary) !important;
          text-decoration: none !important;
          background: var(--bg-card);
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
          animation: navGlow 1.2s ease-out 1;
        }

        /* Extra hard reset for any inherited link styles */
        .header :global(a.nav-link) {
          color: var(--text-secondary) !important;
          text-decoration: none !important;
        }
        .header :global(a.nav-link:hover) {
          color: var(--text-primary) !important;
          text-decoration: none !important;
        }

        /* Animated accent bar */
        .nav .nav-link::after {
          content: '';
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 2px;
          height: 2px;
          background: var(--accent-gradient);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--transition-normal);
        }
        .nav .nav-link:hover::after,
        .nav .nav-link.active::after {
          transform: scaleX(1);
        }

        @keyframes navGlow {
          0% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 0 24px rgba(229, 9, 20, 0.15); }
          100% { box-shadow: var(--shadow-sm); }
        }

        .search-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: -1;
          transition: all var(--transition-normal);
        }

        .main {
          margin-top: 80px;
          min-height: calc(100vh - 80px);
          background: var(--bg-primary);
          position: relative;
        }

        .main-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1;
          transition: all var(--transition-normal);
        }

        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 3rem 0 1rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
        }

        .footer-section h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .footer-section h4 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .footer-section p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .footer-section ul li a:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 1rem;
          }

          .nav {
            display: none;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}