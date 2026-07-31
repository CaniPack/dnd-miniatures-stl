// Auto-generated — DO NOT EDIT. /api/dice: rolls a d20 server-side, emails the discount code, pushes the contact to Omnisend.
const crypto = require('crypto');

const BRAND = "DnD Miniatures STL";
const SITE_TAG = "dnd";
const PUBLIC_EMAIL = "info@dndminiaturestl.com";
const FROM = "DnD Miniatures STL <downloads@dndminiaturestl.com>";
const SITE_URL = "https://www.dndminiaturestl.com";

function couponSecret() { return process.env.COUPON_SECRET || process.env.PAYPAL_SECRET || 'd20-static'; }
function makeCode(pct) {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let nonce = '';
  for (let i = 0; i < 4; i++) nonce += alphabet[crypto.randomInt(alphabet.length)];
  const sig = crypto.createHmac('sha256', couponSecret()).update('d20:' + pct + ':' + nonce).digest('hex').slice(0, 8);
  return 'D20-' + pct + '-' + nonce + '-' + sig;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  try {
    const body = (req.body && typeof req.body === 'object') ? req.body : JSON.parse(req.body || '{}');
    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) { res.status(400).json({ ok: false, error: 'bad_email' }); return; }

    const roll = 1 + crypto.randomInt(20);
    const code = makeCode(roll);

    // Email the code via Resend — this is the primary delivery of the coupon
    let emailSent = false;
    const key = process.env.RESEND_API_KEY;
    if (key) {
      try {
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: FROM,
            to: [email],
            reply_to: PUBLIC_EMAIL,
            subject: 'You rolled a ' + roll + ' — ' + roll + '% off at ' + BRAND,
            html: '<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#222">'
              + '<h2 style="margin:0 0 6px">&#127922; You rolled a ' + roll + '!</h2>'
              + '<p style="margin:0 0 18px">That means <b>' + roll + '% off</b> your next order at ' + BRAND + '.</p>'
              + '<div style="background:#f4f4f4;border:2px dashed #999;border-radius:10px;padding:16px;text-align:center;font-size:22px;font-weight:bold;letter-spacing:1px">' + code + '</div>'
              + '<p style="margin:18px 0 0">How to use it: add minis to your cart at <a href="' + SITE_URL + '">' + SITE_URL.replace('https://','') + '</a>, paste the code in the <b>Discount code</b> box and the price drops instantly.</p>'
              + '<p style="color:#777;font-size:12px;margin-top:22px">Questions? Just reply to this email (' + PUBLIC_EMAIL + ').</p>'
              + '</div>',
          }),
        });
        emailSent = r.ok;
      } catch (e) { /* best-effort */ }
    }

    // Push the contact to Omnisend (subscribed, with roll + code as custom properties) — best-effort
    try {
      const omniKey = process.env.OMNISEND_API_KEY;
      if (omniKey) {
        await fetch('https://api.omnisend.com/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: omniKey, 'Omnisend-Version': '2026-03-15' },
          body: JSON.stringify({
            identifiers: [{
              id: email, type: 'email',
              channels: { email: { status: 'subscribed' } },
              consent: { source: 'd20 discount popup — ' + SITE_TAG },
            }],
            tags: ['source: d20-popup', 'site: ' + SITE_TAG],
            customProperties: { d20Roll: roll, d20Code: code },
          }),
        });
      }
    } catch (e) { /* best-effort */ }

    res.status(200).json({ ok: true, roll: roll, emailSent: emailSent });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'dice_failed' });
  }
};
