# Shell corner cutouts

**Status:** `@msqdx/ui` AppFrame  
**Spec:** `specs/domain/msqdx-ui-app-shell.md`

## What

Viewport ink corners at **top-left**, **bottom-left**, and **bottom-right**, using `MsqdxCornerBox` with **one** concave `cutdown-a` each (outer edges flush/square). Top-right stays free for the brand plaque.

## Defaults

| Knob | Value |
|------|--------|
| Radius | 24px (matches brand corner; `MSQDX_SHELL_CORNER_RADIUS`) |
| Fill | `var(--ink)` |
| Opt-out | `AppFrame` `shellCorners={false}` |

## Related

- `knowledge/components/brand-corner-flush.md`
- `packages/ui/src/components/ShellCorners.tsx`
