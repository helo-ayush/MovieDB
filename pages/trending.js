import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import MovieGrid from "@/components/MovieGrid";

export default function TrendingPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="container" style={{padding:'2rem'}}>
          <h1 className="gradient-text" style={{marginBottom:'1rem'}}>Trending</h1>
          <MovieGrid title="Trending"/>
          <MovieGrid title="Trending" contentType="tv"/>
        </div>
      </SignedIn>
    </>
  );
}


