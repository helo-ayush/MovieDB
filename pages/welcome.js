import Link from 'next/link';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';

export default function Welcome() {
  const { user } = useUser();
  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'var(--bg-primary)'}}>
      <div style={{maxWidth: '900px', width:'100%', padding:'2rem'}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr',
          gap:'2rem',
          background:'var(--bg-secondary)',
          border:'1px solid var(--border-color)',
          borderRadius:'20px',
          padding:'2rem'
        }}>
          <div style={{textAlign:'center'}}>
            <h1 className="gradient-text" style={{fontSize:'3rem',marginBottom:'0.5rem'}}>Welcome to MovieDB</h1>
            <p style={{color:'var(--text-secondary)'}}>Sign in or create an account to continue</p>
          </div>

          <SignedOut>
            <div style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
              <Link href="/sign-in" className="btn-secondary">Sign In</Link>
              <Link href="/sign-up" className="btn-primary">Create Account</Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div style={{textAlign:'center'}}>
              <p style={{color:'var(--text-secondary)'}}>You're signed in as <strong>{user?.primaryEmailAddress?.emailAddress || user?.username}</strong></p>
              <Link href="/" className="btn-primary" style={{marginTop:'1rem',display:'inline-block'}}>Go to app</Link>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}


