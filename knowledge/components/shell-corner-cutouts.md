# Shell corner cutouts

**Status:** `@msqdx/ui` AppFrame  
**Spec:** `specs/domain/msqdx-ui-app-shell.md`

## What

Viewport ink corners at **top-left**, **bottom-left**, and **bottom-right**, using `MsqdxCornerBox` with **one** inner `rounded` each (outer edges flush/square). Top-right stays free for the brand plaque.

## Defaults

| Knob | Value |
|------|--------|
| Radius | 32px (matches brand corner) |
| Fill | `var(--ink)` |
| Opt-out | `AppFrame` `shellCorners={false}` |

## Related

- `knowledge/components/brand-corner-flush.md`
- `packages/ui/src/components/ShellCorners.tsx`
