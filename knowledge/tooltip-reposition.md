# Tooltip reposition (hardening)

**Spec:** `specs/domain/msqdx-ui-extended.md` · **Implements:** `packages/ui/src/components/Tooltip.tsx`

While a tip is **open**, scroll/resize reposition:

1. Registers `scroll` with `{ capture: true, passive: true }` and `resize` with `{ passive: true }`.
2. Coalesces work via `requestAnimationFrame` (at most one pending place per frame).
3. Skips `setState` when computed placement is unchanged.

Closed tips register **no** window listeners.
