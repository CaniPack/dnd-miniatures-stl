// Auto-generated — DO NOT EDIT. /api/coupon: validates a D20 discount code → { valid, percent }.
const crypto = require('crypto');

function couponPercent(code) {
  try {
    const m = /^D20-(\d{1,2})-([A-Z0-9]{4})-([A-Fa-f0-9]{8})$/i.exec(String(code || '').trim());
    if (!m) return 0;
    const pct = parseInt(m[1], 10);
    if (!(pct >= 1 && pct <= 20)) return 0;
    const secret = process.env.COUPON_SECRET || process.env.PAYPAL_SECRET || 'd20-static';
    const sig = crypto.createHmac('sha256', secret).update('d20:' + pct + ':' + m[2].toUpperCase()).digest('hex').slice(0, 8);
    return sig === m[3].toLowerCase() ? pct : 0;
  } catch (e) { return 0; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : JSON.parse(req.body || '{}');
    const pct = couponPercent(body.code);
    res.status(200).json({ valid: pct > 0, percent: pct });
  } catch (e) {
    res.status(200).json({ valid: false, percent: 0 });
  }
};
