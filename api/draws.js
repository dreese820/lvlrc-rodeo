const { supabase } = require('../lib/supabase');
const { verifyToken, setCors } = require('../lib/auth');

// Returns all draws as { rodeoId: { eventId: [contestantId, ...] } }
async function getAllDraws() {
  const { data } = await supabase.from('draws').select('rodeo_id, event_id, contestant_ids');
  const out = {};
  for (const row of data || []) {
    if (!out[row.rodeo_id]) out[row.rodeo_id] = {};
    out[row.rodeo_id][row.event_id] = row.contestant_ids || [];
  }
  return out;
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.json(await getAllDraws());
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    // body: { rodeoId, eventId, contestantIds: [uuid, ...] }
    const { rodeoId, eventId, contestantIds } = req.body || {};
    if (!rodeoId || !eventId || !Array.isArray(contestantIds)) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const { error } = await supabase.from('draws').upsert(
      { rodeo_id: rodeoId, event_id: eventId, contestant_ids: contestantIds, updated_at: new Date().toISOString() },
      { onConflict: 'rodeo_id,event_id' }
    );
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
