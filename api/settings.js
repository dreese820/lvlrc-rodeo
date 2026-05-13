const { supabase } = require('../lib/supabase');
const { verifyToken, setCors } = require('../lib/auth');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { data } = await supabase.from('rodeo_settings').select('rodeo_id, entries_open');
    const out = {};
    for (const row of data || []) {
      out[row.rodeo_id] = { open: row.entries_open };
    }
    return res.json(out);
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    const { rodeoId, open } = req.body || {};
    if (!rodeoId || typeof open !== 'boolean') {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const { error } = await supabase.from('rodeo_settings').upsert(
      { rodeo_id: rodeoId, entries_open: open, updated_at: new Date().toISOString() },
      { onConflict: 'rodeo_id' }
    );
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
