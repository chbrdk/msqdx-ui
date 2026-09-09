# MSQDX UI — Surface clip / slant

**Status:** Accepted (spec) — 2026-09-02 · Phase B presets 2026-09-09 · Phase C polygon 2026-09-09  
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

### Presets (Phase B)

```ts
export type ClipPresetId =
  | 'none'
  | 'slant-bottom'
  | 'slant-bottom-flip'
  | 'slant-top'
  | 'trapezoid'
  | 'parallelogram'

export const DEFAULT_CLIP_PRESET_AMOUNT = '12%'

export function cornerInsetsFromClipPreset(
  id: ClipPresetId,
  amount?: string,
): CornerInsets
```

| Id | Mapping (amount default `12%`) |
|----|--------------------------------|
| `none` | empty |
| `slant-bottom` | `bottomLeft.y` |
| `slant-bottom-flip` | `bottomRight.y` |
| `slant-top` | `topLeft.y` |
| `trapezoid` | `bottomLeft.x` + `bottomRight.x` |
| `parallelogram` | `topLeft.x` + `bottomRight.x` |

MUST be pure and unit-tested. CREATION expands these insets to flat `clipInset*` scene props.

### Free polygon points (Phase C)

```ts
export type ClipPolygonPoint = { x: string; y: string }

export const CLIP_POLYGON_MIN_POINTS = 4
export const CLIP_POLYGON_MAX_POINTS = 8

export function clipPathFromPolygonPoints(
  points: ClipPolygonPoint[] | null | undefined,
): string | undefined

export function parseClipPolygonPoints(raw: unknown): ClipPolygonPoint[] | null
export function formatClipPolygonPoints(points: ClipPolygonPoint[]): string
export function defaultClipPolygonPoints(): ClipPolygonPoint[]
```

- `clipPathFromPolygonPoints` returns `undefined` when count is outside 4–8 or any axis is empty.
- `parseClipPolygonPoints` accepts CSS polygon interior, wrapped `polygon(...)`, or `{x,y}[]`.
- Stack/Card MAY accept optional `clipPolygon?: ClipPolygonPoint[]` in a later Storybook pass; CREATION owns Inspect editing and scene prop `clipPolygon` (string interior).

## States

- Default: no clip.
- Active clip: silhouette cut; overflow of children follows `clip-path` (browser default).

## Accessibility

Clip is visual only. Focus rings / hit targets remain the layout box unless a later phase opts into polygon hit-testing (out of scope).

## Token dependencies

Inset strings MAY be raw CSS lengths/`%` in Storybook Controls. In CREATION, values SHOULD come from Brandion length tokens via Inspect (same as radius). Phase C polygon points are literals only (no per-point token bindings).

## Acceptance

1. Helper unit tests cover empty, single-corner, and four-corner cases.
2. Stack + Card stories show Controls + Bottom-slant preset.
3. Consuming apps import the helper from `@msqdx/ui` (or documented subpath) — no app-local polygon string assembly for this model.
4. Phase B: `cornerInsetsFromClipPreset` unit tests for each id + default amount.
5. Phase C: `clipPathFromPolygonPoints` / `parseClipPolygonPoints` unit tests (4–8 points, calc vertices, reject wrong counts).
