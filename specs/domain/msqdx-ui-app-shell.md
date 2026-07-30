# MSQ DX UI App Shell

## Purpose

Shared workstation shell primitives for products that follow the ECHON V3 composition language.

## Primitives

- `AppFrame`: atmospheric app frame with reserved floating-rail space and topbar/page body slots
- `NavRail`: compact floating rail for primary product navigation
- `BrandCorner`: top-right brand plaque with mark + label

## Rules

- Visual system follows the existing `frame.css` shell language.
- Routing stays app-owned: rail items receive active state from the consumer.
- No product-specific copy or route definitions inside shared UI.

## Acceptance

1. App shell renders with floating left rail and top-right brand corner.
2. Consumers can supply their own link component.
3. Rail supports active, idle, and disabled items.
