import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";

export default function MyListPage() {
  const { user } = useUser();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    const key = `mylist_${user.id}`;
    const saved = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (saved) setItems(JSON.parse(saved));
  }, [user]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="container" style={{padding:'2rem'}}>
          <h1 className="gradient-text" style={{marginBottom:'1rem'}}>My List</h1>
          <div className="movie-grid" style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
            {items && items.length > 0 ? (
              items.map(movie => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p style={{color:'var(--text-secondary)'}}>Nothing saved yet.</p>
            )}
          </div>
        </div>
      </SignedIn>
    </>
  );
}


