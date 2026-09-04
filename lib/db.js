// Supabase/PostgREST caps unbounded selects at 1000 rows by default.
// Page through with .range() so tables that grow past that don't silently truncate.
async function fetchAll(client, table, select, orderCols) {
  const PAGE = 1000;
  const cols = orderCols ? [].concat(orderCols) : [];
  let all = [];
  let from = 0;
  for (;;) {
    let q = client.from(table).select(select).range(from, from + PAGE - 1);
    for (const c of cols) q = q.order(c);
    const { data, error } = await q;
    if (error) throw error;
    all = all.concat(data || []);
    if (!data || data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

module.exports = { fetchAll };
