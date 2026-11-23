# ECCBC brand portfolio (design concept)

A concept for the ECCBC "Our products" page, using patterns from Coca-Cola bottler brand portfolio pages (CCBA, CCEP, Coca-Cola HBC): a filterable brand grid, a brand detail panel with variants, packs and related brands, a "moments of the day" portfolio view, and a responsible-portfolio section.

- Ready-to-open file: `../eccbc-brand-portfolio.html` (single self-contained page)
- Stack: React + TypeScript + Vite + Tailwind, Motion, Phosphor icons
- Brand: ECCBC guidelines (Coca-Cola Red #E41E26, Deep Blue #003A70, Montserrat headings), light and dark mode

## Before going live
- Brand list, variants and pack formats in `src/data.ts` are draft content. Check them against eccbc.com and each market.
- Packshots are stylised CSS placeholders. Replace `src/components/Packshot.tsx` with real transparent packshot images.
- Swap the text wordmark for the official ECCBC logo.

## Develop
```bash
pnpm install
pnpm dev          # local preview
pnpm exec vite build   # writes dist/index.html as one file
```
