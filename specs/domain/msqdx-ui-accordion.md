# MSQ DX UI — Accordion (magazine disclosure)

**Status:** Accepted — 2026-07-30  
**Implements:** `packages/ui/src/components/Accordion.tsx` · CSS `.ds-accordion*` in `css/components.css`  
**Knowledge:** `knowledge/msqdx-ui-accordion.md`  
**Catalog:** Storybook → Molecules/Accordion  
**Pilot:** AUDION v3 project knowledge dossier

## Goals

1. Reusable single-open accordion for long editorial / briefing chapter stacks.
2. Hairline magazine disclosure — not glass / MUI admin accordion.
3. Brand chevron via `--accent`; type/space/color via tokens. Fine geometric rem for chevron size / hairline pad OK (same pattern as other molecules).
4. Spec → CSS tokens → component → Storybook → tests.

## Non-goals

- Multi-open / nested accordions (follow-up).
- Rich-text editor chrome (product TipTap layer).
- Animated height spring libraries.

## Anatomy

| Part | Class | Tokens |
|------|-------|--------|
| Root | `.ds-accordion` | column |
| List | `.ds-accordion-list` | border `--line` |
| Item | `.ds-accordion-item` | border-bottom `--line` |
| Summary | `.ds-accordion-summary` | hover mix `--ink` |
| Summary copy | `.ds-accordion-summary-copy` | column · gap `--space-1` |
| Chevron | `.ds-accordion-chevron` | border `--accent` · rotate open |
| Title | `.ds-accordion-title` | `--font-display` · `--weight-medium` · `--ink` |
| Preview | `.ds-accordion-preview` | `--font-body` · `--muted` · ellipsis |
| Panel | `.ds-accordion-panel` | pad under summary |
| Footer | `.ds-accordion-footer` | optional add row |

## API

```tsx
<Accordion
  value={openId}
  onChange={setOpenId}
  aria-label="Knowledge chapters"
  footer={<button type="button">Add chapter</button>}
  items={[
    { id: 'company', title: 'Company', preview: '…', panel: <Body /> },
  ]}
/>
```

| Prop | Notes |
|------|--------|
| `items` | `{ id, title, preview?, panel, disabled? }[]` |
| `value` | open id or `null` |
| `onChange` | `(id: string \| null) => void` |
| `footer` | optional foot slot (add row) |
| `aria-label` | list label |

## Pairing

- Section counts: `<SectionChrome meta={n} metaTone="accent" quiet as="h3" />`
- Product knowledge: AUDION `project-knowledge-dossier.tsx`

## Acceptance

1. Chevron borders use `var(--accent)`.
2. Single-open: opening B closes A.
3. Preview hidden when open; panel mounts only when open.
4. Catalog entry + unit test green.
5. Knowledge + catalog-map updated.

## Migration

- New dossier / briefing chapter UIs: `Accordion` from `@msqdx/ui`.
- Do not copy AUDION `.audion-knowledge-*` accordion CSS into other apps.
