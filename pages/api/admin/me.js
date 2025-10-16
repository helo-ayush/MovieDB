export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const cookie = req.headers.cookie || '';
  const hasSession = cookie.split(';').map(s=>s.trim()).some(c => c === 'admin_session=true');
  return res.status(200).json({ authenticated: hasSession });
}


