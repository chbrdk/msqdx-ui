# MSQDX UI — ColorPicker

**Status:** Accepted — 2026-08-21  
**Layer:** Molecules  
**Consumers:** CREATION inspect (TokenPicker hybrid color strip); reusable elsewhere  
**Related:** `msqdx-ui-token-picker.md` · `msqdx-ui-swatch-strip.md` · `msqdx-ui-slider.md`

## Purpose

Interactive **color editor** for digital hex colors. Controlled value is always a CSS hex string (`#RRGGBB` or `#RRGGBBAA`). Format tabs (Hex / RGB / HSL) convert internally; the component MUST emit hex only via `onChange`.

## Non-goals

- Brandion / DTCG token authoring.
- Named CSS colors, `oklch()`, `rgb()` as persisted output.
- Eyedropper polyfill for browsers without `window.EyeDropper`.
- Print / Pantone channels.

## API

| Prop | Notes |
|------|--------|
| `value` | Current color hex (`#rgb` / `#rrggbb` / `#rrggbbaa`); empty / invalid → treat as `#000000ff` for editing |
| `onChange` | `(hex: string) => void` — normalized lowercase `#` + 6 or 8 hex digits |
| `open` / `onOpenChange` | Controlled popover (optional; uncontrolled when omitted) |
| `defaultOpen` | Uncontrolled initial open |
| `trigger` | Optional custom trigger; default is a swatch button |
| `disabled` | Disables trigger and panel |
| `aria-label` | Default `Color picker` |
| `hexLabel` / `rgbLabel` / `hslLabel` | Tab labels (defaults Hex / RGB / HSL) |
| `eyedropperLabel` | Eyedropper button label (default `Sample color`) |
| `className` | Root / panel class |

Standalone usage MAY render as popover from a swatch trigger. When embedded by TokenPicker, TokenPicker owns the trigger and mounts the panel.

## Anatomy

1. **Trigger** — swatch showing current color (checkerboard under alpha).
2. **Panel** (fixed / portaled):
   - 2D **saturation × value** plane for active hue
   - **Hue** slider (0–360)
   - **Alpha** slider (0–1) with checkerboard track
   - **Format tabs:** Hex | RGB | HSL — numeric / text fields; commit on blur or Enter
   - **Eyedropper** button when `typeof EyeDropper === 'function'`; otherwise omitted

## Rules (EARS)

- WENN the user changes SV / hue / alpha / a format field, DANN MUSS `onChange` emit a normalized hex (`#rrggbb` when alpha is 1; `#rrggbbaa` otherwise).
- WENN RGB or HSL fields change, DANN MUSS the panel update HSV + Hex display to match.
- WENN Eyedropper is unsupported, DANN MUST the control be hidden (MUST NOT fake sampling).
- WENN Escape is pressed while open, DANN MUSS the panel close.
- WENN the user clicks outside the panel (and not the trigger), DANN MUSS the panel close.
- The picker MUST NOT invent Brandion token paths.

## Accessibility

- Trigger: `aria-expanded`, `aria-haspopup="dialog"`.
- Panel: `role="dialog"`, labelled by title or `aria-label`.
- Format mode: `role="tablist"` / `tab` / `tabpanel`.
- Sliders and fields have accessible names.

## Acceptance

1. Stories: Default, WithAlpha, OpenPanel, Disabled.
2. Tests: hex round-trip; RGB/HSL sync; alpha → 8-digit hex; eyedropper absent without API; Esc closes.
3. Export from `@msqdx/ui` barrel + catalog entry.
