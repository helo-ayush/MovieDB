import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

export default function SignInCatchAll() {
  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'var(--bg-primary)'}}>
      <SignedOut>
        <div style={{padding:'2rem',border:'1px solid var(--border-color)',borderRadius:'16px',background:'var(--bg-secondary)'}}>
          <SignIn appearance={{ elements: { formButtonPrimary: 'btn-primary' } }} routing="path" path="/sign-in" afterSignInUrl="/app" />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}


