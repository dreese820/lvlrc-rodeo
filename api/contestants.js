const { supabase } = require('../lib/supabase');
const { supabaseAdmin } = require('../lib/supabase-admin');
const { verifyToken, setCors } = require('../lib/auth');
const { fetchAll } = require('../lib/db');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const data = await fetchAll(supabase, 'contestants', 'id, name, gender, age_group', ['name', 'id']);
      const out = data.map(c => ({ id: c.id, name: c.name, gender: c.gender, ageGroup: c.age_group }));
      return res.json(out);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { name, gender, ageGroup } = req.body || {};
    if (!name || !gender || !ageGroup) return res.status(400).json({ error: 'Missing fields' });
    const { data, error } = await supabaseAdmin
      .from('contestants')
      .insert({ name: name.trim(), gender, age_group: ageGroup })
      .select('id, name, gender, age_group')
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ id: data.id, name: data.name, gender: data.gender, ageGroup: data.age_group });
  }

  if (req.method === 'DELETE') {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    // Remove contestant from any draw arrays (entries + results cascade via FK)
    const { data: draws } = await supabaseAdmin.from('draws').select('id, contestant_ids');
    const affected = (draws || []).filter(d => (d.contestant_ids || []).includes(id));
    if (affected.length) {
      await Promise.all(affected.map(d =>
        supabaseAdmin.from('draws')
          .update({ contestant_ids: d.contestant_ids.filter(cid => cid !== id) })
          .eq('id', d.id)
      ));
    }

    const { error } = await supabaseAdmin.from('contestants').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
