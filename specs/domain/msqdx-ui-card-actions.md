# MSQDX UI — CardActions

**Status:** Accepted — 2026-08-03  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/CardActions.tsx` · `css/components.css` (`.ds-card-actions`)  
**Catalog:** Storybook → Molecules/CardActions

## Purpose

Equal-width action row for magazine / collection cards (Open · Edit · Delete, product launch links, etc.). Buttons (or link wrappers around buttons) stretch evenly across the full container width so the footer reads as one composition, not a left-clustered chip row.

## Non-goals

- Full card / magazine tile chrome (stays in consuming apps).
- Toolbar / filter chip rows (use `FilterRow`).
- Chat event footers (use `EventFooter`).

## API

```tsx
<CardActions>
  <Link href="..."><Button variant="ghost" size="md">Open</Button></Link>
  <Button variant="ghost" size="md">Edit</Button>
  <Button variant="ghost" size="md">Delete</Button>
</CardActions>

<CardActions hairline={false}>…</CardActions>
```

| Prop | Values | Default |
|------|--------|---------|
| `children` | action nodes (Button, or Link/span wrapping Button) | required |
| `hairline` | boolean — top magazine hairline + padding | `true` |
| `className` | extra classes (app hooks / tests) | — |

## CSS

- Public: `.ds-card-actions`, `.ds-card-actions--hairline`
- Direct children get `flex: 1`; nested `.ds-btn` fills the child width
- Magazine button chrome: square corners, compact type, letter-spacing

## Acceptance

1. Spec + Storybook + unit test.
2. Plexon / Checkion collection cards consume `CardActions` (no divergent equal-flex copies).
3. Hairline language matches existing magazine tiles when `hairline` is on.
