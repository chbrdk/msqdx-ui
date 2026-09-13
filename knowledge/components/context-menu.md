# ContextMenu

Shared pointer-positioned action menu for right-click authoring and icon-anchored topbar clusters.

Spec: `specs/domain/msqdx-ui-context-menu.md`  
Component: `packages/ui/src/components/ContextMenu.tsx`

Apps supply `items` + handlers; chrome/keyboard stay in `@msqdx/ui`.

**Portal:** menu mounts on `document.body` (`ds-context-menu--portal`, `data-testid="ds-context-menu-portal"`) with viewport-clamped `position: fixed`. Optional `anchorRef` keeps the trigger out of outside-close so toggles work under transformed chrome (Creation editor topbar `translateX(-50%)` + `backdrop-filter`).
