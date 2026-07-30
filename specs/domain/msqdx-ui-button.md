# MSQ DX v2 — Button (product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028  
**Implements:** `packages/ui/src/components/Button.tsx` · `css/button.css`  
**Knowledge:** `knowledge/msqdx-ui-motion-buttons.md`  
**Catalog:** Storybook → Atoms/Button · Button.mdx

## Goals

1. One button primitive for actions (primary / ghost / subtle / danger / link).
2. Sizes bind to `--type-sm|md|lg`; weight `--weight-regular`; motion `--motion-hover|press`.
3. Default size **`sm`** (compact product chrome).

## Non-goals

- Replace every legacy `.ghost-btn` in one pass (aliases remain; migrate when touching pages).
- Icon-only toolbar buttons as a separate primitive (use `icon` + children or aria-label).

## API

```tsx
<Button variant="ghost" size="sm">Filter</Button>
<Button variant="primary" icon={<IconResearch />}>Ask</Button>
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `primary` \| `ghost` \| `subtle` \| `danger` \| `link` | `primary` |
| `size` | `sm` \| `md` \| `lg` | `sm` |
| `shape` | `default` \| `pill` | `default` |
| `icon` | ReactNode | — |
| `block` | boolean | false |

## CSS

- Public: `.ds-btn`, `.ds-btn--*`
- Legacy alias: `.ghost-btn` → ghost styles

## Acceptance

1. Spec linked from ADR / completeness / Storybook.
2. Unit tests cover variants/sizes.
3. New actions use `<Button>` only.
