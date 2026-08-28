# MSQ DX — FontFamilyPicker

**Status:** Accepted — 2026-08-28  
**Implements:** `packages/ui/src/components/FontFamilyPicker.tsx` · `packages/ui/src/lib/google-fonts-catalog.ts` · `packages/ui/src/lib/google-font-loader.ts`  
**Consumer:** Brandion token studio (`typography.family`)

## Goals

Searchable font picker with curated Google Fonts catalog, live specimen preview per row, custom family fallback input.

## API

```tsx
<FontFamilyPicker
  value="Inter"
  onChange={setFamily}
  labels={{ search: 'Search fonts', family: 'Family', custom: 'Custom family' }}
  previewText="The quick brown fox"
  size="md"
/>
```

## Large catalogs (TP-2)

- Optional `maxListResults` (default **80**) caps visible rows after search filter.
- **WENN** Ergebnisse gekappt **DANN MUSS** ein Hinweis „Weitere Treffer — Suche verfeinern“ erscheinen.

## Non-goals

- Font file upload / `source` URL field (Brandion advanced).
