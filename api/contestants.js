const { supabase } = require('../lib/supabase');
const { verifyToken, setCors } = require('../lib/auth');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('contestants')
      .select('id, name, gender, age_group')
      .order('name');
    if (error) return res.status(500).json({ error: error.message });
    const out = (data || []).map(c => ({ id: c.id, name: c.name, gender: c.gender, ageGroup: c.age_group }));
    return res.json(out);
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { name, gender, ageGroup } = req.body || {};
    if (!name || !gender || !ageGroup) return res.status(400).json({ error: 'Missing fields' });
    const { data, error } = await supabase
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
    const { error } = await supabase.from('contestants').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
