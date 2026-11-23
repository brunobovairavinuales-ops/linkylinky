# ECCBC brand portfolio (design concept)

A concept for the ECCBC "Our products" page, using patterns from Coca-Cola bottler brand portfolio pages (CCBA, CCEP, Coca-Cola HBC): a filterable brand grid, a brand detail panel with variants, packs and related brands, a "moments of the day" portfolio view, and a responsible-portfolio section.

- Ready-to-open file: `../eccbc-brand-portfolio.html` (single self-contained page)
- Stack: React + TypeScript + Vite + Tailwind, Motion, Phosphor icons
- Brand: ECCBC guidelines (Coca-Cola Red #E41E26, Deep Blue #003A70, Montserrat headings), light and dark mode

## Content source
- Brands, categories (Soft Drinks, Juices, Water, Energy Drinks, Malt, Beer) and logos come from https://www.eccbc.com/about-us/our-products/ (24 brands, same order and category tags).
- Logos are the single-colour SVGs from that page, in `src/assets/logos/` (optimised with svgo). They are inlined into the build.
- Tile tint colours and the "moments" groupings are design choices, not from eccbc.com.
- No flavours or pack sizes are listed: eccbc.com does not publish them, so the brand panel says they vary by country.

## Before going live
- Swap the text wordmark for the official ECCBC logo.
- Add real product photography if wanted.

## Develop
```bash
pnpm install
pnpm dev          # local preview
pnpm exec vite build   # writes dist/index.html as one file
```
