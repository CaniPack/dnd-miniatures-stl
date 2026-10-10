/* Meta Pixel for dndminiaturestl.com (dataset "DnD Miniatures STL - Pixel").
 * Loaded from <head> on every page, right after the GA4 gtag stub.
 * Fires PageView on load and mirrors the site's existing GA4 ecommerce
 * events (gtag) to Meta, so no other page code has to change:
 *   view_item -> ViewContent, add_to_cart -> AddToCart,
 *   begin_checkout -> InitiateCheckout, purchase -> Purchase,
 *   generate_lead -> Lead
 */
(function () {
  if (window.__dndMetaPixel) return;
  window.__dndMetaPixel = true;
  if (location.pathname.indexOf('/oculto') === 0) return; // internal metrics page

  var PIXEL_ID = '2045553026157023';

  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  var MAP = {
    view_item: 'ViewContent',
    add_to_cart: 'AddToCart',
    begin_checkout: 'InitiateCheckout',
    purchase: 'Purchase',
    generate_lead: 'Lead'
  };

  function toMeta(gaName, p) {
    var fbName = MAP[gaName];
    if (!fbName) return;
    p = p || {};
    var items = Array.isArray(p.items) ? p.items : [];
    var data = { currency: p.currency || 'USD' };
    if (items.length) {
      data.content_type = 'product';
      data.content_ids = items.map(function (i) { return String(i.item_id || ''); });
      data.contents = items.map(function (i) {
        return { id: String(i.item_id || ''), quantity: i.quantity || 1, item_price: Number(i.price) || 0 };
      });
      data.num_items = items.reduce(function (n, i) { return n + (i.quantity || 1); }, 0);
      if (items.length === 1 && items[0].item_name) data.content_name = String(items[0].item_name);
    }
    if (fbName === 'Lead') {
      // GA4 'value' here is the dice roll, not money: send the lead without a value.
      delete data.currency;
    } else {
      var value = Number(p.value);
      if (!isFinite(value) || value <= 0) {
        value = items.reduce(function (s, i) { return s + (Number(i.price) || 0) * (i.quantity || 1); }, 0);
      }
      data.value = Math.round(value * 100) / 100;
    }
    var opts;
    if (fbName === 'Purchase' && p.transaction_id) opts = { eventID: String(p.transaction_id) };
    if (opts) fbq('track', fbName, data, opts); else fbq('track', fbName, data);
  }

  var original = typeof window.gtag === 'function' ? window.gtag : null;
  window.gtag = function () {
    try {
      if (arguments[0] === 'event' && typeof arguments[1] === 'string') toMeta(arguments[1], arguments[2]);
    } catch (e) { /* tracking must never break the page */ }
    if (original) return original.apply(this, arguments);
  };
})();
