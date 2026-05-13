const bcrypt = require('bcryptjs');
const { supabase } = require('../lib/supabase');
const { signToken, setCors } = require('../lib/auth');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });

  const { data: user } = await supabase
    .from('admin_users')
    .select('id, username, password_hash')
    .eq('username', username.trim())
    .single();

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = signToken({ id: user.id, username: user.username });
  res.json({ token });
};
