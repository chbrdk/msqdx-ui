# ShellBackButton

Fixed top-left history-back plaque for product shells — mirror of BrandCorner.

- Spec: `specs/domain/msqdx-ui-shell-back-button.md`
- Source: `packages/ui/src/components/ShellBackButton.tsx`
- Styles: `packages/ui/src/css/frame.css` (`.shell-back-corner*`)
- Slot: `AppFrame.backCorner` (omits decorative TL `ShellCorners` scoop)

Apps own history (`router.back()`); DS has no router.
