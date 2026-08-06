# Shell corner cutouts

**Status:** `@msqdx/ui` AppFrame  
**Spec:** `specs/domain/msqdx-ui-app-shell.md`

## What

Viewport ink cutdowns at **top-left**, **bottom-left**, and **bottom-right**, using the same `MsqdxCornerBox` geometry as `BrandCorner`. Top-right stays free for the brand plaque.

## Defaults

| Knob | Value |
|------|--------|
| Radius | 32px (matches brand corner) |
| Fill | `var(--ink)` |
| Opt-out | `AppFrame` `shellCorners={false}` |

## Related

- `knowledge/components/brand-corner-flush.md`
- `packages/ui/src/components/ShellCorners.tsx`
