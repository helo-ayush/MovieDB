export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const isSecure = process.env.NODE_ENV === 'production';
  const cookie = [
    'admin_session=false',
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    isSecure ? 'Secure' : '',
    'Max-Age=0'
  ].filter(Boolean).join('; ');
  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ success: true });
}


