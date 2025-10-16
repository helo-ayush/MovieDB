import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import MovieGrid from "@/components/MovieGrid";
import GenreFilter from "@/components/GenreFilter";
import { useState } from 'react';

export default function TvPage() {
  const [genreId, setGenreId] = useState(null);
  // Grids reuse MovieGrid which will fetch movies by title prop; here we directly build sections via custom TV hook wrappers.
  // To keep UI consistent, we can render three TV sections by temporarily mapping titles.
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="container" style={{padding:'2rem'}}>
          <h1 className="gradient-text" style={{marginBottom:'0'}}>TV Shows</h1>
          <GenreFilter contentType="tv" selectedGenreId={genreId} onChange={setGenreId} />
          <MovieGrid title="Popular" contentType="tv" filterGenreId={genreId}/>
          <MovieGrid title="Top Rated" contentType="tv" filterGenreId={genreId}/>
          <MovieGrid title="Trending" contentType="tv" filterGenreId={genreId}/>
        </div>
      </SignedIn>
    </>
  );
}


