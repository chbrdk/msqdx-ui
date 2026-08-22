# MSQDX UI — Product Switcher (BrandCorner menu)

**Status:** Accepted — 2026-08-22  
**Layer:** Molecules  
**Implements:** `ProductSwitcherPanel` · `BrandCornerProductMenu`  
**Related:** [`msqdx-ui-app-shell.md`](./msqdx-ui-app-shell.md) · [`msqdx-ui-flyout.md`](./msqdx-ui-flyout.md) · Plexon `GET /api/platform/products`

## Purpose

Ecosystem **app launcher** anchored to the top-right `BrandCorner`. Click toggles a panel listing federated products; hover label-expand on the plaque remains unchanged.

Apps own **items, URLs, entitlements, and launch handlers**. This package owns plaque interaction, panel chrome, keyboard, and close behaviour.

## API

```ts
type ProductSwitcherItem = {
  id: string
  label: string
  href?: string | null
  disabled?: boolean
  description?: string
}

type ProductSwitcherPanelProps = {
  items: ProductSwitcherItem[]
  currentProductId: string
  label?: string
  footer?: ReactNode
  onSelectItem?: (item: ProductSwitcherItem) => void
  className?: string
}

type BrandCornerProductMenuProps = BrandCornerProps & {
  currentProductId: string
  items: ProductSwitcherItem[]
  menuLabel?: string
  footer?: ReactNode
  onSelectItem?: (item: ProductSwitcherItem) => void
}
```

## Behaviour

WENN `items.length > 0`, DANN MUSS `BrandCornerProductMenu` die Plaque als Menü-Trigger rendern (`role="button"`, `aria-haspopup="menu"`, `aria-expanded`).

WENN der Nutzer die Plaque klickt oder Enter/Space drückt (fokussiert), DANN MUSS das Panel unter der Ecke (nach unten, rechts ausgerichtet) ein-/ausgeblendet werden.

WENN das Panel offen ist, DANN MUSS das Label sichtbar bleiben (`labelReveal="always"` bis Schließen).

WENN Escape oder Klick außerhalb, DANN MUSS das Panel schließen.

WENN ein Item `disabled` ist oder `id === currentProductId`, DANN MUSS es nicht launchbar sein (visuell als aktiv markiert, kein Navigation-Handler).

WENN `onSelectItem` gesetzt ist, DANN MUSS der Consumer den Launch steuern; sonst MUSS ein Item mit absolutem `href` in einem neuen Tab geöffnet werden.

## Non-goals

- Produkt-Registry, Entitlements, Env-URLs (Plexon `lib/platform-products.ts` + `/api/platform/products`)
- Session/Cookie-Übernahme zwischen Produkten
- Vollständiger Produktkatalog mit Runtime-Health (bleibt Plexon Dashboard / `ProductCatalog`)

## Consumers

| App | Data source |
|-----|-------------|
| Plexon | `GET /api/platform/products` + `buildFederatedLaunchHref` |
| CREATION | Static staging URLs via `paths` / `runtime-config` (Phase 1); später Plexon-BFF optional |

## Acceptance

1. Storybook: CREATION plaque + 6-product grid; aktives Produkt hervorgehoben.  
2. Vitest: open/close, Escape, current item disabled, `onSelectItem` callback.  
3. Plexon `AppShell` und CREATION `AppShell` nutzen `BrandCornerProductMenu`.  
4. Keine hardcodierten Produkt-URLs in `@msqdx/ui`.
