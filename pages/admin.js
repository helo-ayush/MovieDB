import { useEffect, useState } from 'react';

function useAdminSession() {
  const [hasSession, setHasSession] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    async function check() {
      try {
        const res = await fetch('/api/admin/me');
        const data = await res.json();
        setHasSession(!!data.authenticated);
      } finally {
        setChecked(true);
      }
    }
    check();
  }, []);
  return hasSession && checked;
}

export default function AdminPage() {
  const hasSession = useAdminSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      // reload to pick cookie
      window.location.replace('/admin');
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!hasSession) {
    return (
      <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'var(--bg-primary)'}}>
        <form onSubmit={handleLogin} style={{
          width:'100%',maxWidth:'380px',padding:'1.5rem',
          background:'var(--bg-secondary)',border:'1px solid var(--border-color)',borderRadius:'16px'
        }}>
          <h2 className="gradient-text" style={{marginTop:0,marginBottom:'1rem',textAlign:'center'}}>Admin Login</h2>
          {error && <div style={{color:'#ef4444',marginBottom:'0.75rem',textAlign:'center'}}>{error}</div>}
          <label style={{display:'block',color:'var(--text-secondary)',fontSize:'0.9rem',marginBottom:'6px'}}>Username</label>
          <input name="username" value={username} onChange={e=>setUsername(e.target.value)} required autoComplete="username" style={{
            width:'100%',padding:'10px 12px',borderRadius:'10px',border:'1px solid var(--border-color)',background:'var(--bg-card)',color:'var(--text-primary)'
          }} />
          <label style={{display:'block',color:'var(--text-secondary)',fontSize:'0.9rem',margin:'12px 0 6px'}}>Password</label>
          <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" style={{
            width:'100%',padding:'10px 12px',borderRadius:'10px',border:'1px solid var(--border-color)',background:'var(--bg-card)',color:'var(--text-primary)'
          }} />
          <button disabled={loading} className="btn-primary" style={{width:'100%',marginTop:'14px'}}>{loading? 'Signing in...' : 'Sign in'}</button>
          <p style={{color:'var(--text-muted)',fontSize:'0.85rem',marginTop:'10px',textAlign:'center'}}>Protected route. Manual access only at /admin</p>
        </form>
      </div>
    );
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.replace('/admin');
  }

  return (
    <div className="container" style={{padding:'2rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
        <h1 className="gradient-text" style={{marginBottom:'0.5rem'}}>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-secondary">Sign out</button>
      </div>
      <p style={{color:'var(--text-secondary)',marginBottom:'1.25rem'}}>Review user-submitted content and manage your site.</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'1rem'}}>
        <section style={{border:'1px solid var(--border-color)',borderRadius:'16px',background:'var(--bg-secondary)',padding:'1rem'}}>
          <h3 style={{marginTop:0}}>People Reviews</h3>
          <p style={{color:'var(--text-secondary)'}}>Moderate and approve user reviews left on movies.</p>
          <a href="/admin/reviews" className="btn-secondary">View all</a>
        </section>
        <section style={{border:'1px solid var(--border-color)',borderRadius:'16px',background:'var(--bg-secondary)',padding:'1rem'}}>
          <h3 style={{marginTop:0}}>People Queries</h3>
          <p style={{color:'var(--text-secondary)'}}>Respond to contact messages and support tickets.</p>
          <a href="/admin/queries" className="btn-secondary">View all</a>
        </section>
        <section style={{border:'1px solid var(--border-color)',borderRadius:'16px',background:'var(--bg-secondary)',padding:'1rem'}}>
          <h3 style={{marginTop:0}}>Reports</h3>
          <p style={{color:'var(--text-secondary)'}}>Coming soon: insights on traffic, engagement, and content.</p>
          <a href="/admin/reports" className="btn-secondary">Open reports</a>
        </section>
      </div>
    </div>
  );
}


