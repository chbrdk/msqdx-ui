# MSQ DX UI App Shell

## Purpose

Shared workstation shell primitives for products that follow the ECHON V3 composition language.

## Primitives

- `AppFrame`: atmospheric app frame with reserved floating-rail space and topbar/page body slots
- `NavRail`: compact floating rail for primary product navigation
- `BrandCorner`: top-right brand plaque — **default logo-only**; product `label` reveals on hover/focus with a leftward expand animation
- `ShellCorners`: viewport cutdown ornaments at top-left, bottom-left, and bottom-right (top-right reserved for `BrandCorner`)

## BrandCorner (hover expand)

WENN `showLogo` is true (default) AND `labelReveal` is `hover` (default), DANN MUST the plaque show only the mark at rest.

WENN the designer hovers or keyboard-focuses the plaque, DANN MUST the label (and divider) expand **toward the left** with a short transition.

WENN `prefers-reduced-motion: reduce`, DANN MUST the expand still occur but without timed width animation (instant).

WENN `showLogo` is false OR `labelReveal` is `always`, DANN MUST the label stay visible (no collapse).

The product name MUST remain available to assistive tech (`aria-label` on the plaque when the visual label is collapsible).

The plaque MUST accept pointer events (`pointer-events: auto` on the box) so hover works; the outer fixed wrapper may stay non-blocking for the rest of the viewport.

## Rules

- Visual system follows the existing `frame.css` shell language.
- Routing stays app-owned: rail items receive active state from the consumer.
- No product-specific copy or route definitions inside shared UI.
- Shell cutouts reuse `MsqdxCornerBox` (same radius as brand corner, default 24px). Each free corner gets **one** concave `cutdown-a` (not convex `rounded`). Top-right stays open for the brand plaque.

## Acceptance

1. App shell renders with floating left rail and top-right brand corner.
2. App shell renders ink cutdown corners at TL / BL / BR so free viewport corners read as scooped-rounded (opt-out via `shellCorners={false}`).
3. Consumers can supply their own link component.
4. Rail supports active, idle, and disabled items.
