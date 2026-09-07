# MSQDX UI — Surface clip / slant

**Status:** Accepted (spec) — 2026-09-02  
**Layer:** Atoms (shared paint helper + Stack/Card props)  
**Consumers:** CREATION v3 (`specs/domain/surface-clip-slant.md`), Site Kit surfaces  
**Tasks:** CREATION `tasks/wave16-surface-clip-slant.md`

## Purpose

Expose a **token-friendly corner-inset clip** so surfaces can show a slanted edge in Storybook and in CREATION without a path editor. Implementation target: CSS `clip-path: polygon(...)`.

## API

### Types

```ts
export type CornerInsets = {
  topLeft?: { x?: string; y?: string }
  topRight?: { x?: string; y?: string }
  bottomRight?: { x?: string; y?: string }
  bottomLeft?: { x?: string; y?: string }
}
```

Unset / `0` / `0%` / `0px` = no inset on that axis.

### Helper

- `clipPathFromCornerInsets(insets: CornerInsets): string | undefined`
  - Returns `undefined` when all insets are empty/zero.
  - Otherwise `polygon(x1 y1, x2 y2, x3 y3, x4 y4)` per CREATION CL3 formula.
- MUST be pure and unit-tested (no DOM).

### Component props (Phase A minimum)

- `Stack` and `Card` MUST accept optional `clipInset?: CornerInsets`.
- WHEN `clipPathFromCornerInsets(clipInset)` is defined, the root element MUST set `style.clipPath` (or equivalent class + CSS variable bridge). MUST NOT apply `transform: skew`.

### Storybook

- Controls: four corners with X/Y string fields (or paired).
- Preset story: **Bottom slant** (`bottomLeft.y = '12%'`) demonstrating down-right diagonal.
- Docs note: layout/hit box remains rectangular.

## States

- Default: no clip.
- Active clip: silhouette cut; overflow of children follows `clip-path` (browser default).

## Accessibility

Clip is visual only. Focus rings / hit targets remain the layout box unless a later phase opts into polygon hit-testing (out of scope).

## Token dependencies

Inset strings MAY be raw CSS lengths/`%` in Storybook Controls. In CREATION, values SHOULD come from Brandion length tokens via Inspect (same as radius).

## Acceptance

1. Helper unit tests cover empty, single-corner, and four-corner cases.
2. Stack + Card stories show Controls + Bottom-slant preset.
3. Consuming apps import the helper from `@msqdx/ui` (or documented subpath) — no app-local polygon string assembly for this model.
