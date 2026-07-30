# MSQ DX v2 — Chip / Filter (product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028  
**Implements:** `packages/ui/src/components/Chip.tsx` · `css/chip.css`  
**Knowledge:** `knowledge/msqdx-ui-chip.md`  
**Catalog:** Storybook → Atoms/Chip · Chip.mdx  
**Pilot:** `/signals` category filters (+ pager buttons via existing `<Button>`)

## Goals

1. One chip primitive for filter toggles across Signals / Waves / Sources / locale-theme toggles.
2. Couple size/type to typography tokens (`--type-sm|md`); radius to `--radius-sm|md`.
3. Selected state uses accent border/ink (current product language).
4. Spec → component → CSS → Storybook → Signals pilot → tests.

## Non-goals (this pass)

- Replace `metric-chip` (OpsStrip) — separate status primitive.
- Trajectory tones (`traj-new` / `traj-rising`) semantics rewrite — keep CSS modifiers; Chip accepts `className`.
- Full Field/Select design system (status `<select>` stays; Field comes next).
- Migrate all Waves/Sources pages in this pass (only Signals pilot required).

## Anatomy

| Part | Token / class |
|------|----------------|
| Face | `--font-body` |
| Size `sm` (**default**) | padding compact · `--type-xs` / slight tracking · former `.dense` |
| Size `md` | padding `--space-2` · `--type-md` · theme toggle / roomier |
| Radius | `--radius-sm` |
| Idle | transparent bg · `--line` border · `--muted` ink |
| Selected | `--accent` border + ink |
| Hover (idle) | light ink wash via `--motion-hover` |
| Motion | `--motion-hover` on border/color/background |

## API

```tsx
<Chip selected={category === null} size="sm" onClick={() => setCategory(null)}>
  {t('lens.all')}
</Chip>
<Chip selected={false} size="sm" static>LABEL</Chip> // non-interactive
```

| Prop | Values | Notes |
|------|--------|-------|
| `selected` | boolean | maps to `.ds-chip--selected` / legacy `.active` |
| `size` | `sm` \| `md` | **default `sm`**; `md` for roomier chrome |
| `static` | boolean | render `<span>` instead of `<button>` |
| `disabled` | boolean | button only |
| `className` | string | e.g. traj modifiers |

## CSS contract

- Public: `.ds-chip`, `.ds-chip--sm`, `.ds-chip--md`, `.ds-chip--selected`
- Legacy aliases (must keep working): `.chip`, `.chip.dense`, `.chip.active`
- Group: `.ds-chip-row` (flex wrap + gap `--space-1`/`--space-2`); Signals keeps `.signals-filter-chips`

## Filter chrome (Signals)

| Element | Treatment |
|---------|-----------|
| Filter label | `<Text role="label">` or `.signals-filter-label` → type tokens |
| Category chips | `<Chip size="sm" selected={…}>` |
| Status select | unchanged class this pass (Field later) |
| Pager | `<Button variant="ghost" size="sm">` |

## Acceptance

1. Spec linked from ADR 0028 / knowledge / Storybook list.
2. Unit tests: Chip selected/size/static; Signals page uses `ds-chip` in category row.
3. Legacy `.chip.active` still styles ThemeToggle without JSX change.
4. Storybook shows idle / selected / sm / md / disabled / row.

## Migration

- New filters: `<Chip>` only.
- Waves/Sources: follow-up (same API).
- Theme/Locale toggles: optional later swap to `<Chip>`.
