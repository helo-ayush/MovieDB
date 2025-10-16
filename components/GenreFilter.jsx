import { useEffect, useState } from 'react';
import { movieAPI, tvAPI } from '@/lib/tmdb';

export default function GenreFilter({ contentType = 'movie', selectedGenreId, onChange }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = contentType === 'tv' ? await tvAPI.getGenres() : await movieAPI.getGenres();
        if (isMounted) setGenres(data.genres || []);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [contentType]);

  return (
    <div className="genre-filter">
      <button
        className={`genre-pill ${!selectedGenreId ? 'active' : ''}`}
        onClick={() => onChange(null)}
      >All</button>
      {loading ? (
        <span style={{color:'var(--text-secondary)', marginLeft: '8px'}}>Loading…</span>
      ) : genres.map(genre => (
        <button
          key={genre.id}
          className={`genre-pill ${selectedGenreId === genre.id ? 'active' : ''}`}
          onClick={() => onChange(genre.id)}
        >{genre.name}</button>
      ))}

      <style jsx>{`
        .genre-filter { display:flex; flex-wrap:wrap; gap:8px; margin: 0 0 16px 0; }
        .genre-pill { padding: 8px 12px; border-radius:999px; border:1px solid var(--border-color); background: var(--bg-card); color: var(--text-secondary); cursor:pointer; }
        .genre-pill.active { background: var(--accent-gradient); color: #fff; border-color: transparent; }
        .genre-pill:hover { border-color: var(--accent-primary); color: var(--text-primary); }
      `}</style>
    </div>
  );
}


