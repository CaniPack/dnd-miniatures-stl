// Auto-generated — DO NOT EDIT. /api/dice: d20 roll → discount code + free mini, with layered anti-abuse.
const crypto = require('crypto');

const BRAND = "DnD Miniatures STL";
const SITE_TAG = "dnd";
const PUBLIC_EMAIL = "info@dndminiaturestl.com";
const FROM = "DnD Miniatures STL <downloads@dndminiaturestl.com>";
const SITE_URL = "https://www.dndminiaturestl.com";
const SITE_HOST = new URL(SITE_URL).host.replace(/^www\./, '');
const PRIZES = [{"slug":"forest-slime","title":"Forest Slime","price":4,"links":[{"name":"Forest Slime","url":"https://drive.google.com/uc?export=download&id=1pqLLrLTnk7mvEWF_6iXlu7EteSSGSB59"}]},{"slug":"minotaur-spear","title":"Minotaur Spear","price":4,"links":[{"name":"Minotaur Spear","url":"https://drive.google.com/uc?export=download&id=1_Smso5KjpWBcOtyZ5e46zdjd2_v2Ocjf"}]},{"slug":"orc-lady-ro","title":"Orc Lady","price":4,"links":[{"name":"Orc Lady","url":"https://drive.google.com/uc?export=download&id=1OXD61EoUqhqFwyqXYT3gcRC2ukbANgG_"}]},{"slug":"orc-lord-ro","title":"Orc Lord","price":4,"links":[{"name":"Orc Lord","url":"https://drive.google.com/uc?export=download&id=1Z6zctbfJ_uSUVkov9qWVlBHFOBceK4WL"}]},{"slug":"giant-earth-worm","title":"Giant Earth Worm","price":4,"links":[{"name":"Giant Earth Worm","url":"https://drive.google.com/uc?export=download&id=1Mfoov3YdQJbrazHAp5bt0cIi3e7hhAkh"}]},{"slug":"blue-slime","title":"Slime","price":4,"links":[{"name":"Blue Slime","url":"https://drive.google.com/uc?export=download&id=19WY_ip3p9rr-FOo-3_qE7xQlqtFJ2AdU"}]},{"slug":"mercenary-twin-blades","title":"Mercenary Twin Blades","price":4,"links":[{"name":"Mercenary Twin Blades","url":"https://drive.google.com/uc?export=download&id=1Mho2cdkMfZ8XGZvwH168HvpONNlAz8qV"}]},{"slug":"mercenary-captain","title":"Mercenary Captain","price":4,"links":[{"name":"Mercenary Captain","url":"https://drive.google.com/uc?export=download&id=1i1xxjfRebBIoyGqmty0Yorztdqc-Phm_"}]},{"slug":"bandit-brute","title":"Bandit Brute","price":4,"links":[{"name":"Bandit Brute","url":"https://drive.google.com/uc?export=download&id=1qwkqXQXPQNlveixGLW3WJYlz2rxNuFDA"}]},{"slug":"bard-violet-muse","title":"Bard","price":4,"links":[{"name":"Bard Violet Muse","url":"https://drive.google.com/uc?export=download&id=1dIq9haFnIoWTxMFN2Fo3ygO7WkHWf88-"}]},{"slug":"pirate-hammer-corsair","title":"Pirate","price":4,"links":[{"name":"Pirate Hammer Corsair","url":"https://drive.google.com/uc?export=download&id=1gTIM925OyXWR6Nb-Pw3ozzr_3An1Xpcu"}]},{"slug":"baphomet-strength-ro","title":"Baphomet Demon Lord","price":4,"links":[{"name":"Baphomet Strength","url":"https://drive.google.com/uc?export=download&id=14w5htoiOr0lRWbIYuVSy7L5YAotUERmS"}]},{"slug":"kobold-ranger-emberfang","title":"Kobold Ranger","price":4,"links":[{"name":"Kobold Ranger Emberfang","url":"https://drive.google.com/uc?export=download&id=13pSasrtYhco_SoWIxQ8MNZBVVUAYHMlB"}]},{"slug":"dragonborn-scaleblade","title":"Dragonborn Warrior","price":4,"links":[{"name":"Dragonborn Scaleblade","url":"https://drive.google.com/uc?export=download&id=1R5peTv8kKiaWm2jSNAVNew7I8YOTy594"}]},{"slug":"bandit-sorcerer","title":"Bandit Sorcerer","price":4,"links":[{"name":"Bandit Sorcerer","url":"https://drive.google.com/uc?export=download&id=17Gdsuo4rwnkG95oh0ulUSU3Q3c8yY50O"}]},{"slug":"desert-spear-warrior","title":"Desert Warrior","price":4,"links":[{"name":"Desert Spear Warrior","url":"https://drive.google.com/uc?export=download&id=1qD61mg388oYFCNMcagNdXNk9ilIETf4y"}]},{"slug":"bronze-spirit-monk","title":"Monk","price":4,"links":[{"name":"Bronze Spirit Monk","url":"https://drive.google.com/uc?export=download&id=1PD30cDmunicbyWlwTkPbBrcCrm8yQ0uk"}]},{"slug":"haunted-house-diorama","title":"Haunted House","price":4,"links":[{"name":"Haunted House Diorama","url":"https://drive.google.com/uc?export=download&id=10xqT1aDgfpDDu-60vSFbH5UcyzTnoTWC"}]},{"slug":"forest-warden-archer","title":"Ranger","price":4,"links":[{"name":"Forest Warden Archer","url":"https://drive.google.com/uc?export=download&id=1lCWnWbgc56SzU3iUCNnNF_sIM90hMTDy"}]},{"slug":"mercenary-warband-pack-6","title":"Mercenary Warband Pack 6","price":30,"links":[{"name":"Mercenary Captain","url":"https://drive.google.com/uc?export=download&id=1i1xxjfRebBIoyGqmty0Yorztdqc-Phm_"},{"name":"Mercenary Sword Shield","url":"https://drive.google.com/uc?export=download&id=1N-tAl06SwoXb4s6IiDh4kU8MRazHbqg5"},{"name":"Mercenary Spearman","url":"https://drive.google.com/uc?export=download&id=1RN3rysNfe2YywiqTwqQAOGzGkOpFI-bB"},{"name":"Mercenary Sword Axe","url":"https://drive.google.com/uc?export=download&id=1bWiVmqArr-6QeF-6EwI-Wm0GpAL4h1Em"},{"name":"Mercenary Veteran","url":"https://drive.google.com/uc?export=download&id=1GYxVJ-c110eovSU1UEgVNAI2zU6jXB-I"},{"name":"Mercenary Twin Blades","url":"https://drive.google.com/uc?export=download&id=1Mho2cdkMfZ8XGZvwH168HvpONNlAz8qV"}]}];

// Disposable-email domains — farming a free STL needs a real inbox
const DISPOSABLE = ['mailinator.com','guerrillamail.com','sharklasers.com','yopmail.com','tempmail.com','temp-mail.org','10minutemail.com','trashmail.com','getnada.com','dispostable.com','maildrop.cc','mintemail.com','throwawaymail.com','fakeinbox.com','mohmal.com','emailondeck.com','mailnesia.com','mytemp.email','burnermail.io','spamgourmet.com','tempail.com','tmpmail.net','moakt.com','inboxkitten.com'];

function couponSecret() { return process.env.COUPON_SECRET || process.env.PAYPAL_SECRET || 'd20-static'; }
function makeCode(pct) {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let nonce = '';
  for (let i = 0; i < 4; i++) nonce += alphabet[crypto.randomInt(alphabet.length)];
  const sig = crypto.createHmac('sha256', couponSecret()).update('d20:' + pct + ':' + nonce).digest('hex').slice(0, 8);
  return 'D20-' + pct + '-' + nonce + '-' + sig;
}
// Canonical form defeats dot/plus alias farming (a+1@gmail == a1@ == a.1@)
function normEmail(e) {
  const [user, domain] = e.split('@');
  let u = user.split('+')[0];
  if (domain === 'gmail.com' || domain === 'googlemail.com') u = u.replace(/\./g, '');
  return u + '@' + domain;
}
function claimSig() { return crypto.createHmac('sha256', couponSecret()).update('d20claim:' + SITE_TAG).digest('hex').slice(0, 16); }
// Per-instance IP throttle (best-effort — survives warm invocations)
const ipLog = globalThis.__d20ips = globalThis.__d20ips || new Map();

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  try {
    // Layer 1: same-site origin (blocks naive curl loops; absent headers are tolerated)
    const origin = String(req.headers.origin || req.headers.referer || '');
    if (origin && !origin.includes(SITE_HOST)) { res.status(403).json({ ok: false, error: 'bad_origin' }); return; }

    // Layer 2: signed claim cookie — one roll per browser
    const cookies = String(req.headers.cookie || '');
    if (cookies.includes('d20c=' + claimSig())) { res.status(429).json({ ok: false, error: 'already_claimed' }); return; }

    // Layer 3: IP throttle — max 3 rolls/day per IP per warm instance
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const now = Date.now();
    const entry = ipLog.get(ip);
    if (entry && now - entry.ts < 86400000 && entry.count >= 3) { res.status(429).json({ ok: false, error: 'too_many' }); return; }

    const body = (req.body && typeof req.body === 'object') ? req.body : JSON.parse(req.body || '{}');
    const rawEmail = String(body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(rawEmail) || rawEmail.length > 254) { res.status(400).json({ ok: false, error: 'bad_email' }); return; }
    const email = normEmail(rawEmail);
    // Layer 4: no disposable inboxes
    if (DISPOSABLE.includes(email.split('@')[1])) { res.status(400).json({ ok: false, error: 'bad_email' }); return; }

    // Layer 5: persistent one-roll-per-email via Omnisend contact properties (when the key exists)
    const omniKey = process.env.OMNISEND_API_KEY;
    if (omniKey) {
      try {
        const cr = await fetch('https://api.omnisend.com/v3/contacts?email=' + encodeURIComponent(email), {
          headers: { 'X-API-KEY': omniKey },
        });
        if (cr.ok) {
          const cj = await cr.json();
          const found = (cj.contacts || [])[0];
          if (found && found.customProperties && found.customProperties.d20Roll) {
            res.status(429).json({ ok: false, error: 'already_claimed' }); return;
          }
        }
      } catch (e) { /* best-effort */ }
    }

    const roll = 1 + crypto.randomInt(20);
    const code = makeCode(roll);
    const prize = PRIZES[roll - 1] || null;

    // Email the code + free mini via Resend — the prize only exists in a real inbox
    let emailSent = false;
    const key = process.env.RESEND_API_KEY;
    if (key) {
      try {
        const prizeHtml = prize ? '<h3 style="margin:22px 0 6px">&#127873; Your free mini: ' + prize.title + '</h3>'
          + '<p style="margin:0 0 8px;font-size:14px">Roll ' + roll + ' unlocks this one — the higher the roll, the bigger the mini. Download link' + (prize.links.length > 1 ? 's' : '') + ':</p>'
          + prize.links.map(function (l) { return '<p style="margin:4px 0"><a href="' + l.url + '" style="color:#1a7f4e;font-weight:bold">&#11015; ' + l.name + ' (.STL)</a></p>'; }).join('')
          + '<p style="color:#777;font-size:12px;margin-top:6px">Same license as the shop: print it, paint it, even sell your prints.</p>' : '';
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: FROM,
            to: [rawEmail],
            reply_to: PUBLIC_EMAIL,
            subject: 'You rolled a ' + roll + ' — ' + roll + '% off + a free mini' + (prize ? ' (' + prize.title + ')' : '') + '!',
            html: '<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#222">'
              + '<h2 style="margin:0 0 6px">&#127922; You rolled a ' + roll + '!</h2>'
              + '<p style="margin:0 0 18px">That means <b>' + roll + '% off</b> your next order at ' + BRAND + ' — and a free miniature on the house.</p>'
              + '<div style="background:#f4f4f4;border:2px dashed #999;border-radius:10px;padding:16px;text-align:center;font-size:22px;font-weight:bold;letter-spacing:1px">' + code + '</div>'
              + '<p style="margin:14px 0 0;font-size:14px">Paste the code in the <b>Discount code</b> box of the cart at <a href="' + SITE_URL + '">' + SITE_URL.replace('https://','') + '</a>.</p>'
              + prizeHtml
              + '<p style="color:#777;font-size:12px;margin-top:22px">One roll per adventurer. Questions? Just reply to this email (' + PUBLIC_EMAIL + ').</p>'
              + '</div>',
          }),
        });
        emailSent = r.ok;
      } catch (e) { /* best-effort */ }
    }

    // Push the contact to Omnisend (normalized email = persistent one-roll-per-person marker) — best-effort
    try {
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
            customProperties: { d20Roll: roll, d20Code: code, d20Prize: prize ? prize.slug : '' },
          }),
        });
      }
    } catch (e) { /* best-effort */ }

    // Mark the claim: signed cookie (1 year) + IP counter
    res.setHeader('Set-Cookie', 'd20c=' + claimSig() + '; Max-Age=31536000; Path=/; SameSite=Lax; HttpOnly');
    ipLog.set(ip, { ts: entry && now - entry.ts < 86400000 ? entry.ts : now, count: entry && now - entry.ts < 86400000 ? entry.count + 1 : 1 });
    if (ipLog.size > 5000) ipLog.clear();

    res.status(200).json({ ok: true, roll: roll, emailSent: emailSent, prize: prize ? { title: prize.title } : null });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'dice_failed' });
  }
};
