// Auto-generated — metrics + sales JSON for /oculto. DO NOT EDIT.
// Auth: STATS_TOKEN env var, passed as ?token= or Authorization: Bearer.
const KEY = "dnd";

async function redis(url, tok, cmds) {
  try {
    const r = await fetch(url + '/pipeline', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmds),
    });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

async function paypalToken(base, id, secret) {
  const r = await fetch(base + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(id + ':' + secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) return null;
  const j = await r.json();
  return j.access_token || null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const expected = process.env.STATS_TOKEN;
  if (!expected) { res.status(500).json({ error: 'not_configured' }); return; }
  const got = String(req.headers.authorization || '').replace('Bearer ', '') || String((req.query && req.query.token) || '');
  if (got !== expected) { res.status(401).json({ error: 'unauthorized' }); return; }

  const out = { visits: null, sales: [], paypal: null };

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && tok) {
    const days = [];
    for (let i = 29; i >= 0; i--) days.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));
    const cmds = [
      ['GET', KEY + ':v:total'],
      ['HGETALL', KEY + ':v:p'],
      ['LRANGE', KEY + ':sales', 0, 499],
    ];
    for (const d of days) cmds.push(['GET', KEY + ':v:d:' + d]);
    const r = await redis(url, tok, cmds);
    if (r) {
      const total = parseInt((r[0] && r[0].result) || '0', 10) || 0;
      const flat = (r[1] && r[1].result) || [];
      const byPage = [];
      for (let i = 0; i < flat.length; i += 2) byPage.push({ page: flat[i], views: parseInt(flat[i + 1], 10) || 0 });
      byPage.sort(function (a, b) { return b.views - a.views; });
      const byDay = days.map(function (d, i) {
        return { date: d, views: parseInt(((r[3 + i] || {}).result) || '0', 10) || 0 };
      });
      out.visits = { total: total, byPage: byPage, byDay: byDay };
      out.sales = ((r[2] && r[2].result) || []).map(function (s) {
        try { return JSON.parse(s); } catch (e) { return null; }
      }).filter(Boolean);
    }
  }

  // PayPal Transaction Search, last 30 days. Needs the "Transaction Search"
  // feature enabled on the PayPal app; otherwise returns 403 and we report it.
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (id && secret) {
    const bases = process.env.PAYPAL_API_BASE
      ? [process.env.PAYPAL_API_BASE]
      : ['https://api-m.paypal.com', 'https://api-m.sandbox.paypal.com'];
    for (const base of bases) {
      try {
        const token = await paypalToken(base, id, secret);
        if (!token) continue;
        const end = new Date();
        const start = new Date(end.getTime() - 30 * 86400000);
        const q = '?start_date=' + start.toISOString().slice(0, 19) + '-0000'
          + '&end_date=' + end.toISOString().slice(0, 19) + '-0000'
          + '&transaction_status=S&fields=transaction_info,payer_info&page_size=100';
        const r2 = await fetch(base + '/v1/reporting/transactions' + q, {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (!r2.ok) { out.paypal = { ok: false, status: r2.status }; continue; }
        const j = await r2.json();
        out.paypal = {
          ok: true,
          transactions: (j.transaction_details || []).map(function (t) {
            const ti = t.transaction_info || {};
            const payer = t.payer_info || {};
            return {
              date: ti.transaction_initiation_date || null,
              amount: parseFloat(((ti.transaction_amount || {}).value) || '0'),
              currency: ((ti.transaction_amount || {}).currency_code) || 'USD',
              slug: ti.custom_field || null,
              email: payer.email_address || null,
              id: ti.transaction_id || null,
            };
          }).filter(function (t) { return t.amount > 0; }),
        };
        break;
      } catch (e) { out.paypal = { ok: false, error: 'fetch_failed' }; }
    }
  }

  res.status(200).json(out);
};
