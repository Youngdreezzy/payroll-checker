import { redis } from './_lib.js';

export default async function handler(req, res) {
  const acct = String(req.query.acct || '').replace(/\D/g, '');
  if (acct.length !== 10) return res.status(400).json({ error: 'Enter a 10-digit account number.' });
  const records = await redis.hgetall(`acct:${acct}`);
  if (!records) return res.status(404).json({ error: 'No payroll record found for this account number.' });
  res.setHeader('Cache-Control', 'no-store');
  res.json({ records });
}
