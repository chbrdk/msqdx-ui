# MSQ DX — Button (magazine)

**Status:** Accepted — 2026-08-03 (magazine defaults)  
**Implements:** `packages/ui/src/components/Button.tsx` · `css/button.css`  
**Knowledge:** `knowledge/components/button-magazine.md`  
**Catalog:** Storybook → Atoms/Button

## Goals

1. One button primitive — magazine **square** corners + readable type scale.
2. Default size **`md`** (collection / CardActions scale); `sm` dense chrome; `lg` launch CTAs.
3. Prefer `<Button>` (or `buttonClassName` on `NextLink`) over raw `.ds-btn` / `.ghost-btn` class soup.

## API

```tsx
<Button variant="ghost">Filter</Button>
<Button variant="primary" size="lg">Start scan</Button>
<Button href="/projects" variant="ghost">Open</Button>
<a className={buttonClassName({ variant: 'primary' })} href="…">…</a>
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `primary` \| `ghost` \| `subtle` \| `danger` \| `link` | `primary` |
| `size` | `sm` \| `md` \| `lg` | **`md`** |
| `shape` | `square` \| `pill` \| `rounded` (`default` → square) | **`square`** |
| `href` | string | renders `<a>` with button classes |
| `icon` | ReactNode | — |
| `block` | boolean | false |

## Sizes (magazine)

| Size | Use | Approx |
|------|-----|--------|
| `sm` | Dialogs, icon chrome, dense toolbars | min-height 2rem |
| `md` | Default CTAs, CardActions | min-height 2.5rem |
| `lg` | Launch / cover CTAs | min-height 3.25rem |

## Shapes

- **square** (default) — product magazine language
- **pill** — chat send only
- **rounded** — rare soft ops chrome

## Acceptance

1. Unit tests cover defaults (md + square), shapes, `href`, `buttonClassName`.
2. New actions use `<Button>` / `buttonClassName` only.
3. CardActions no longer re-declare button padding/radius (inherits md square).
