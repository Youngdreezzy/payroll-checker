import { redis } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.ADMIN_PASSWORD || req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: 'Wrong admin password.' });

  const { month, rows } = req.body || {};
  if (!/^\d{4}-\d{2}$/.test(month || '') || !Array.isArray(rows) || !rows.length)
    return res.status(400).json({ error: 'Send a month (YYYY-MM) and at least one row.' });

  const p = redis.pipeline();
  for (const r of rows) {
    if (/^\d{10}$/.test(r.acct)) p.hset(`acct:${r.acct}`, { [month]: r }); // same month = overwritten
  }
  p.sadd('months', month);
  await p.exec();
  res.json({ ok: true, saved: rows.length, month });
}
