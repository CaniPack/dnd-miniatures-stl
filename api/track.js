// Auto-generated — pageview counter for /oculto metrics. DO NOT EDIT.
const KEY = "dnd";

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).end(); return; }
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const tok = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !tok) { res.status(204).end(); return; }
  try {
    const ua = String(req.headers['user-agent'] || '');
    if (/bot|crawl|spider|headless|lighthouse|monitor|preview|python|curl/i.test(ua)) { res.status(204).end(); return; }
    const body = (req.body && typeof req.body === 'object') ? req.body : JSON.parse(req.body || '{}');
    let p = String(body.p || '/').slice(0, 200);
    if (p.indexOf('/oculto') === 0 || p.indexOf('/api/') === 0) { res.status(204).end(); return; }
    let page;
    if (p === '/' || p === '/index.html') page = '(home)';
    else if (p.indexOf('/product/') === 0) page = p.slice(9).split('/')[0] || '(home)';
    else page = p;
    const day = new Date().toISOString().slice(0, 10);
    await fetch(url + '/pipeline', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', KEY + ':v:total'],
        ['INCR', KEY + ':v:d:' + day],
        ['EXPIRE', KEY + ':v:d:' + day, 7776000],
        ['HINCRBY', KEY + ':v:p', page, 1],
      ]),
    });
  } catch (e) { /* never fail a beacon */ }
  res.status(204).end();
};
