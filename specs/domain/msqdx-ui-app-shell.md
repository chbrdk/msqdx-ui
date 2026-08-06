# MSQ DX UI App Shell

## Purpose

Shared workstation shell primitives for products that follow the ECHON V3 composition language.

## Primitives

- `AppFrame`: atmospheric app frame with reserved floating-rail space and topbar/page body slots
- `NavRail`: compact floating rail for primary product navigation
- `BrandCorner`: top-right brand plaque with mark + label
- `ShellCorners`: viewport cutdown ornaments at top-left, bottom-left, and bottom-right (top-right reserved for `BrandCorner`)

## Rules

- Visual system follows the existing `frame.css` shell language.
- Routing stays app-owned: rail items receive active state from the consumer.
- No product-specific copy or route definitions inside shared UI.
- Shell cutouts reuse `MsqdxCornerBox` / `msqdxCutdown` geometry (same radius as brand corner, default 32px). Top-right stays square/open for the brand plaque.

## Acceptance

1. App shell renders with floating left rail and top-right brand corner.
2. App shell renders ink cutdown corners at TL / BL / BR so free viewport corners read as scooped-rounded (opt-out via `shellCorners={false}`).
3. Consumers can supply their own link component.
4. Rail supports active, idle, and disabled items.
