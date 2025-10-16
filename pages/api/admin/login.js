export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  // Handle raw string body just in case
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const rawUsername = body?.username ?? '';
  const rawPassword = body?.password ?? '';
  const username = String(rawUsername).trim();
  const password = String(rawPassword).trim();

  const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim();
  const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'admin123').trim();

  const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isSecure = process.env.NODE_ENV === 'production';
  const cookie = [
    'admin_session=true',
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    isSecure ? 'Secure' : '',
    `Max-Age=${60 * 60 * 12}` // 12 hours
  ].filter(Boolean).join('; ');

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ success: true });
}


