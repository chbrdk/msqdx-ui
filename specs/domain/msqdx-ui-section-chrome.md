# MSQ DX v2 — SectionChrome (product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 §3 · §16  
**Implements:** `apps/web-ui/src/components/SectionChrome.tsx` · CSS `.section-chrome*` in `design-system/css/components.css`  
**Knowledge:** `knowledge/msqdx-ui-section-chrome.md`  
**Catalog:** Storybook → Molecules/SectionChrome · SectionChrome.mdx  
**Typography:** `specs/domain/msqdx-ui-typography.md` (title role · `--type-2xl` · thin)

## Goals

1. Every major module header uses `SectionChrome` (title + optional meta/action/icon).
2. Title/meta bind to **type tokens** — no rem/weight literals in chrome CSS.
3. Quiet mode = nested sections (no icon, no bottom rule noise, uppercase title).
4. Spec → tokenize CSS → `<Text>` in component → Storybook → tests.

## Non-goals

- Redesign Overview band layout / ultra-wide.
- Replace every ad-hoc `h2`/`h3` outside modules this pass.
- Role rainbow rails as primary chrome (softened; optional `role` prop kept).

## Anatomy

| Part | Class | Tokens |
|------|-------|--------|
| Root | `.section-chrome` | flex · gap `--space-*` · border `--line` |
| Quiet | `.section-chrome-quiet` | no bottom border · tighter pad |
| Title | `.section-chrome-title` | display face · `--type-2xl` · `--weight-thin` · `--section-title` |
| Title `as="h3"` | same + size | `--type-xl` |
| Quiet title | + uppercase | `--track-label` |
| Meta | `.section-chrome-meta` | `--type-md` / meta role · muted (default) |
| Meta accent | `.section-chrome-meta--accent` | `--accent` · `--weight-medium` — use for counts |
| Icon | `.section-chrome-icon` | `--radius-sm` · accent |
| Action | `.section-chrome-action` | flex-shrink 0 |

## API

```tsx
<SectionChrome
  title={t('waves.listTitle')}
  meta={t('waves.listMeta', { shown, matched, total })}
  quiet
  as="h3"
/>
```

| Prop | Notes |
|------|--------|
| `title` | string |
| `meta` | optional ReactNode |
| `metaTone` | `muted` (default) \| `accent` — brand count / badge meta |
| `action` | optional ReactNode (prefer `<Button>`) |
| `icon` | ignored when `quiet` |
| `quiet` | nested / in-panel headers |
| `as` | `h2` (default) \| `h3` |
| `role` | optional `PanelRole` → `.panel-role-*` |

## Acceptance

1. `.section-chrome-title` uses `var(--type-2xl)` / `var(--weight-thin)` (not `1.1rem` / `200`).
2. Component title/meta use `<Text role="title|meta">` (+ chrome classes).
3. Unit test + `appFrameLayout` guard updated for tokens.
4. Storybook Quiet / Default / WithRole still render.
5. Knowledge + ADR §16 linked.

## Migration

- New module headers: `SectionChrome` only.
- Signal detail parity pass may reuse quiet chrome on subheads.
