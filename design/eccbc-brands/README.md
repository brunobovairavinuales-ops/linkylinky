# ECCBC brand portfolio (design concept)

A concept for the ECCBC "Our products" page, using patterns from Coca-Cola bottler brand portfolio pages (CCBA, CCEP, Coca-Cola HBC): a filterable brand grid, a brand detail panel with variants, packs and related brands, a "moments of the day" portfolio view, and a responsible-portfolio section.

- Ready-to-open file: `../eccbc-brand-portfolio.html` (single self-contained page)
- Stack: React + TypeScript + Vite + Tailwind, Motion, Phosphor icons
- Brand: ECCBC guidelines (Coca-Cola Red #E41E26, Deep Blue #003A70, Montserrat headings), light and dark mode

## Content source
- Brands, categories (Soft Drinks, Juices, Water, Energy Drinks, Malt, Beer) and logos come from https://www.eccbc.com/about-us/our-products/ (24 brands, same order and category tags).
- Logos are the single-colour SVGs from that page, in `src/assets/logos/` (optimised with svgo). They are inlined into the build.
- Product shots (`src/assets/products/`), full-colour logos (`src/assets/logos-colour/`) and brand descriptions for the 7 ECCBC brands that also appear on https://www.coca-colacompany.com/brands/all-brands: Coca-Cola, Fanta, Sprite, Schweppes, Aquarius, Ciel, Minute Maid. Ciel has no description there. Images were trimmed of transparent padding.
- The other 17 brands (local and partner brands such as Hawai, Voltic, Predator, Monster) are not on that page, so they use the eccbc.com logo only.
- Pack photos for 12 brands (`src/assets/packs/`) and the official ECCBC logo come from the eccbc.com homepage product slider. These are preferred over the Coca-Cola Company shots where both exist.
- 10 brands still have no pack photo: Bonaqua, Monster, Tops, Cappy, Cappy Pulpy, Vimto, Sparletta, Parrot, Predator, Power Play. Their pages show the logo.
- Tile tint colours and the "moments" groupings are design choices, not from eccbc.com.
- No flavours or pack sizes are listed: eccbc.com does not publish them, so the brand panel says they vary by country.

## Before going live
- Swap the text wordmark for the official ECCBC logo.
- Pack photos for the 10 brands above.
- Check usage rights for Coca-Cola Company imagery with the brand team before publishing.

## Structure
- Home: eccbc.com-style product slider (arrows, swipe, keyboard, thumbnails, autoplay paused on hover), filterable brand grid, Global icons, moments, commitments.
- Brand pages: `#/brand/<id>` (hash routes, so the single HTML file works anywhere). Hero picture, introduction, facts, picture gallery, related brands, previous/next.

## Develop
```bash
pnpm install
pnpm dev          # local preview
pnpm exec vite build   # writes dist/index.html as one file
```
