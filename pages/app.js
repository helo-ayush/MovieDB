import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import MovieGrid from "@/components/MovieGrid";
import GenreFilter from "@/components/GenreFilter";
import { useState } from 'react';

export default function AppHome() {
  const [genreId, setGenreId] = useState(null);
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="container" style={{padding:'2rem'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
            <h1 className="gradient-text" style={{marginBottom:'0'}}>Movies</h1>
          </div>
          <GenreFilter contentType="movie" selectedGenreId={genreId} onChange={setGenreId} />
          <MovieGrid title="Now Playing" filterGenreId={genreId}/>
          <MovieGrid title="Top Rated" filterGenreId={genreId}/>
          <MovieGrid title="Popular" filterGenreId={genreId}/>
          <MovieGrid title="Upcoming" filterGenreId={genreId}/>
        </div>
      </SignedIn>
    </>
  );
}


