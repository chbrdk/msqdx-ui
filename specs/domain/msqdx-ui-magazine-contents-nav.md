# MSQDX UI — MagazineContentsNav

**Status:** Accepted — 2026-08-10  
**Layer:** Molecules  
**Origin:** Brandion Guideline Studio + Checkion Result/GEO magazine section nav (duplicated sticky/compact pattern)  
**Catalog:** Storybook → Molecules/MagazineContentsNav  
**Knowledge:** `knowledge/components/magazine-contents-nav.md`

## Purpose

Sticky magazine “Contents” navigation that:

1. Lists numbered segment tabs (index + name).
2. Compacts when the page scrolls past a sentinel (IntersectionObserver).
3. Stays product-agnostic — hrefs, labels, and exit actions are props/slots.

## Non-goals

- Product routes / i18n dictionaries.
- Next.js `Link` coupling — apps pass `renderItem` or plain `<a>`.
- Guideline / scan domain data.

## API

```tsx
<MagazineContentsNav
  aria-label="Guideline sections"
  label="Contents"
  exit={<a href="/hub">Analysis Hub</a>}
  activeId="tokens"
  items={[
    { id: 'tokens', index: '01', label: 'Tokens', href: '/guidelines/1/tokens' },
    { id: 'compliance', index: '02', label: 'Compliance', href: '/guidelines/1/compliance' },
    { id: 'evaluate', index: '03', label: 'Evaluate', href: '/guidelines/1/evaluate' },
  ]}
/>
```

| Prop | Notes |
|------|--------|
| `items` | `{ id, index, label, href }[]` |
| `activeId` | Selected segment id |
| `label` | Uppercase eyebrow (default `Contents`) |
| `exit` | Optional header action (link/button) |
| `columns` | CSS grid columns (default `3`) |
| `renderItem` | Optional `(item, { selected, className }) => ReactNode` for Next `Link` |
| `compact` | Force compact; omit for auto via sentinel |
| `aria-label` | Nav accessible name |

## Tokens / CSS

Classes under `.ds-magazine-contents*` — tokens `--bg0`, `--line`, `--ink`, `--muted`, `--accent`, `--font-display`, `--weight-*`.

## Accessibility

- `role="tablist"` on list; items `role="tab"` + `aria-selected`.
- Sentinel is `aria-hidden`.
- Compact state exposed as `data-compact`.

## Acceptance

1. Stories: Default, Compact, WithExit, ManyItems, BrandionStudio, CheckionResult.
2. Unit test: active class + compact observer (mock IntersectionObserver).
3. Brandion / Checkion can replace local Contents CSS with this primitive (migration optional).
4. Catalog + barrel export.

## Consumers

- Brandion Guideline Studio (`guideline-studio-shell.tsx`)
- Checkion Result / GEO section nav
