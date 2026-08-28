# MSQ DX UI App Shell

## Purpose

Shared workstation shell primitives for products that follow the ECHON V3 composition language.

## Primitives

- `AppFrame`: atmospheric app frame with reserved floating-rail space and topbar/page body slots
- `NavRail`: compact floating rail for primary product navigation
- `BrandCorner`: top-right brand plaque — **default logo-only**; product `label` reveals on hover/focus with a leftward expand animation; optional `onActivate` for product launcher menus (`BrandCornerProductMenu`)
- `ShellBackButton`: top-left history-back plaque (icon-only arrow); mount via `AppFrame.backCorner` — see `msqdx-ui-shell-back-button.md`
- `ShellCorners`: viewport cutdown ornaments at top-left, bottom-left, and bottom-right (top-right reserved for `BrandCorner`; top-left omitted when `backCorner` is set)

## NavRail orientation + compact dock

WENN the dock edge is `left` or `right`, DANN MUST the rail use `data-orientation="vertical"`, fixed capsule **width** `--rail-w`, and **height** shrink-wrapped to content (`height: auto` / `max-content`).

WENN the dock edge is `top` or `bottom`, DANN MUST the rail use `data-orientation="horizontal"`, fixed capsule **height** `--rail-w`, and **width** shrink-wrapped to content (`width: max-content`, capped by viewport). Flex direction MUST be row so items lay out along the long axis.

WENN the viewport matches the compact breakpoint (`max-width: 900px`), DANN MUST the rail dock to `bottom`, stay horizontal, keep shell z-index (`--z-nav-rail`), and MUST NOT leave bottom for free edge snap (drag disabled or locked to bottom). `onDockEdgeChange('bottom')` MUST fire so `AppFrame` reserves bottom padding.

## NavRail surface + stacking

WENN the rail is painted, DANN MUST the capsule use a translucent surface plus `backdrop-filter` blur so page content behind the rail reads frosted (disabled under `prefers-reduced-transparency` / `prefers-reduced-motion`).

WENN stacking against page content, DANN MUST the rail use `--z-nav-rail` (above sticky page chrome, below `--z-modal` / native dialog top layer / toast / popover). Dialogs, chat overlays, and equivalent modal layers MUST remain able to paint above the rail.

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
