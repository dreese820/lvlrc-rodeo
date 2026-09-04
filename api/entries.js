const { supabase } = require('../lib/supabase');
const { supabaseAdmin } = require('../lib/supabase-admin');
const { verifyToken, setCors } = require('../lib/auth');
const { fetchAll } = require('../lib/db');

// Returns all entries as { rodeoId: { eventId: [contestantId, ...] } }
async function getAllEntries() {
  const data = await fetchAll(supabase, 'entries', 'rodeo_id, event_id, contestant_id', 'id');
  const out = {};
  for (const row of data || []) {
    if (!out[row.rodeo_id]) out[row.rodeo_id] = {};
    if (!out[row.rodeo_id][row.event_id]) out[row.rodeo_id][row.event_id] = [];
    out[row.rodeo_id][row.event_id].push(row.contestant_id);
  }
  return out;
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      return res.json(await getAllEntries());
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { action, rodeoId, eventId, contestantId } = req.body || {};

    // Bulk: action='set', payload has array of eventIds to enter/remove for one contestant
    if (action === 'entryall') {
      const { rodeoId, contestantId, eventIds } = req.body;
      if (!eventIds?.length) return res.json({ ok: true });
      const rows = eventIds.map(eid => ({ rodeo_id: rodeoId, event_id: eid, contestant_id: contestantId }));
      await supabaseAdmin.from('entries').upsert(rows, { onConflict: 'rodeo_id,event_id,contestant_id', ignoreDuplicates: true });
      return res.json({ ok: true });
    }

    if (action === 'clearall') {
      const { rodeoId, contestantId, eventIds } = req.body;
      if (!eventIds?.length) return res.json({ ok: true });
      await supabaseAdmin.from('entries')
        .delete()
        .eq('rodeo_id', rodeoId)
        .eq('contestant_id', contestantId)
        .in('event_id', eventIds);
      return res.json({ ok: true });
    }

    if (action === 'add') {
      await supabaseAdmin.from('entries')
        .upsert({ rodeo_id: rodeoId, event_id: eventId, contestant_id: contestantId },
          { onConflict: 'rodeo_id,event_id,contestant_id', ignoreDuplicates: true });
      return res.json({ ok: true });
    }

    if (action === 'remove') {
      await supabaseAdmin.from('entries')
        .delete()
        .eq('rodeo_id', rodeoId)
        .eq('event_id', eventId)
        .eq('contestant_id', contestantId);
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: 'Unknown action' });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
