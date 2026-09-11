# Dialog `showModal` lifecycle

**Date:** 2026-09-11  
**Spec:** `specs/domain/msqdx-ui-extended.md`  
**Source:** `packages/ui/src/components/Dialog.tsx`

## Problem

Native `<dialog>.close()` fires a `close` event. React maps that to `onClose`.

If the host gates the Dialog with `if (!open) return null` (or Strict Mode remounts the tree while `open`), the effect cleanup correctly calls `close()` to leave the top layer, but that event also calls host `onClose` → `setOpen(false)`. The dialog then appears to “do nothing” when opened (Asset Library / Image… in CREATION).

Always-mounted dialogs (open toggled via props only) usually survive because Strict Mode’s remount happens once with `open=false`.

## Rule

- Cleanup / prop-driven `close()`: quiet — do not notify the host.
- User dismiss (Escape → cancel, Close button, backdrop if used): call host `onClose`.

## Prefer

Always mount Dialog hosts when cheap; still rely on quiet close so conditional mounts stay safe.
