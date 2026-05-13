const { supabase } = require('../lib/supabase');
const { setCors } = require('../lib/auth');

// Team roping partner event IDs (must match EVENTS ids in shared.js)
const TR_PAIRS = {
  'trh_g_1014': 'tre_g_1014', 'tre_g_1014': 'trh_g_1014',
  'trh_g_1518': 'tre_g_1518', 'tre_g_1518': 'trh_g_1518',
  'trh_b_1014': 'tre_b_1014', 'tre_b_1014': 'trh_b_1014',
  'trh_b_1518': 'tre_b_1518', 'tre_b_1518': 'trh_b_1518'
};

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { rodeoId, name, gender, ageGroup, eventIds, isLL } = req.body || {};

  if (!rodeoId || !name || !gender || !ageGroup || !Array.isArray(eventIds)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check rodeo is open
  const { data: setting } = await supabase
    .from('rodeo_settings')
    .select('entries_open')
    .eq('rodeo_id', rodeoId)
    .single();

  if (!setting?.entries_open) {
    return res.status(403).json({ error: 'Online entry is not currently open for this rodeo.' });
  }

  // Validate team roping: can't enter both header and heeler
  for (const eid of eventIds) {
    const partner = TR_PAIRS[eid];
    if (partner && eventIds.includes(partner)) {
      return res.status(400).json({ error: 'Cannot enter both Header and Heeler in Team Roping.' });
    }
  }

  // Find or create contestant (match on name+gender+ageGroup, case-insensitive)
  let contestantId;
  const { data: existing } = await supabase
    .from('contestants')
    .select('id')
    .ilike('name', name.trim())
    .eq('gender', gender)
    .eq('age_group', ageGroup)
    .maybeSingle();

  if (existing) {
    contestantId = existing.id;
  } else {
    const { data: created, error: ce } = await supabase
      .from('contestants')
      .insert({ name: name.trim(), gender, age_group: ageGroup })
      .select('id')
      .single();
    if (ce) return res.status(500).json({ error: ce.message });
    contestantId = created.id;
  }

  // Insert entries (ignore duplicates)
  if (eventIds.length > 0) {
    const rows = eventIds.map(eid => ({
      rodeo_id: rodeoId,
      event_id: eid,
      contestant_id: contestantId
    }));
    const { error: ee } = await supabase
      .from('entries')
      .upsert(rows, { onConflict: 'rodeo_id,event_id,contestant_id', ignoreDuplicates: true });
    if (ee) return res.status(500).json({ error: ee.message });
  }

  // If any event in 0-5 age group, set LL flag in results pre-record
  if (isLL && ageGroup === '0-5') {
    const llRows = eventIds.map(eid => ({
      rodeo_id: rodeoId,
      event_id: eid,
      contestant_id: contestantId,
      is_ll: true,
      updated_at: new Date().toISOString()
    }));
    await supabase.from('results')
      .upsert(llRows, { onConflict: 'rodeo_id,event_id,contestant_id' });
  }

  return res.json({ ok: true, contestantId });
};
