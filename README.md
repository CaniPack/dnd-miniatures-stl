# DnD Miniatures STL — Landing Page + 36 Product Pages

Static SEO + AI-search-optimized site promoting 36 DnD/fantasy STL listings on Etsy.

## Output structure

```
landing-dnd/
├── index.html                # main landing (5 category sections + bundles)
├── product/<slug>/index.html # 36 product pages
├── images/                   # all product images + brand assets
├── sitemap.xml               # 37 URLs with image annotations
├── robots.txt                # liberal AI crawler allowlist
├── llms.txt                  # AI-engine readable catalog
├── humans.txt
├── a3c9f2e5b8d14072e9c5a3f1b7d8e6c4.txt        # IndexNow validation
└── README.md
```

## Deploy

100% static. Same options as the One Piece landing — Cloudflare Pages, GitHub Pages, Netlify, Vercel.

**Cloudflare Pages**: pages.cloudflare.com → Create Application → Upload Assets → drag `landing-dnd/`.

## Before deploying

1. Buy domain `dndminiaturestl.com` (Cloudflare Registrar, Namecheap, etc.)
2. Point it to the static host (Cloudflare Pages auto-handles if domain is on Cloudflare)
3. Replace the 4 `REPLACE_WITH_*` tokens in `index.html` after verifying on Google Search Console, Bing Webmaster Tools, Yandex, Pinterest
4. Create a separate GA4 property for this site and replace `REPLACE_WITH_GA4_ID` in every HTML file

## Regenerate

```bash
node build-dnd-landing.js
```

Reads from `uploaded/<slug>/`. Only includes slugs listed in `CATEGORY` or `BUNDLE_SLUGS` at the top of the script — so the One Piece listings are excluded automatically.

## SEO features

Same as the One Piece landing — Product/Breadcrumb/FAQ/ItemList/Organization schema, OpenGraph + Twitter Cards, image sitemap, llms.txt, IndexNow key, robots.txt with explicit AI bot allows.
