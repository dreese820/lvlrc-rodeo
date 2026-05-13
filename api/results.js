const { supabase } = require('../lib/supabase');
const { verifyToken, setCors } = require('../lib/auth');

// Returns all results as { rodeoId: { eventId: { contestantId: { fields } } } }
async function getAllResults() {
  const { data } = await supabase.from('results').select('*');
  const out = {};
  for (const row of data || []) {
    if (!out[row.rodeo_id]) out[row.rodeo_id] = {};
    if (!out[row.rodeo_id][row.event_id]) out[row.rodeo_id][row.event_id] = {};
    out[row.rodeo_id][row.event_id][row.contestant_id] = {
      time: row.time_val != null ? String(row.time_val) : '',
      pen: row.penalty != null ? String(row.penalty) : '',
      loop1: row.loop1 != null ? String(row.loop1) : '',
      loop2: row.loop2 != null ? String(row.loop2) : '',
      loop3: row.loop3 != null ? String(row.loop3) : '',
      loopCount: row.loop_count || 0,
      loopTotal: row.loop_total != null ? parseFloat(row.loop_total).toFixed(3) : '',
      score: row.score != null ? String(row.score) : '',
      noTime: row.no_time || false,
      ll: row.is_ll || false
    };
  }
  return out;
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.json(await getAllResults());
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    const { rodeoId, eventId, contestantId, field, value } = req.body || {};
    if (!rodeoId || !eventId || !contestantId || !field) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const colMap = {
      time: 'time_val',
      pen: 'penalty',
      loop1: 'loop1',
      loop2: 'loop2',
      loop3: 'loop3',
      loopCount: 'loop_count',
      loopTotal: 'loop_total',
      score: 'score',
      noTime: 'no_time',
      ll: 'is_ll'
    };

    const col = colMap[field];
    if (!col) return res.status(400).json({ error: 'Unknown field' });

    // Parse numeric fields properly
    let dbValue = value;
    if (['time_val', 'penalty', 'loop1', 'loop2', 'loop3', 'loop_total', 'score'].includes(col)) {
      const n = parseFloat(value);
      dbValue = (!value || isNaN(n)) ? null : n;
    }
    if (col === 'loop_count') {
      dbValue = parseInt(value) || 0;
    }

    const { error } = await supabase.from('results').upsert(
      {
        rodeo_id: rodeoId,
        event_id: eventId,
        contestant_id: contestantId,
        [col]: dbValue,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'rodeo_id,event_id,contestant_id' }
    );
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
