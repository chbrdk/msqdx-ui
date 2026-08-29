# MSQDX UI — HubIndexCard

**Status:** Accepted — 2026-08-29  
**Layer:** Molecules  
**Origin:** Audion project / persona index tile (`Panel variant="card"` + title/meta)  
**Catalog:** Molecules/HubIndexCard

## Purpose

Shared **hub index tile** for Collection/project/composition grids: large title, meta row, optional **media** slot (e.g. live composition preview), and a **create** dashed variant. Same chrome as Audion hubs — apps supply content only.

## API

| Prop | Type | Notes |
|------|------|--------|
| `title` | `ReactNode` | Required |
| `meta` | `ReactNode` | Optional status / counts line |
| `media` | `ReactNode` | Optional preview above title (clipped by consumer) |
| `variant` | `'default' \| 'create'` | Create = dashed add tile |
| `href` | `string` | When set, root is `<a>` |
| `as` | — | Root is `<a>` if `href`, else `<button>` (create / onClick) |
| `className` | `string` | |
| button/`a` attrs | | `onClick`, `disabled`, `target`, … |

## Anatomy

```
[ optional media ]
title (display)
meta (muted)
```

Inner shell: `Panel variant="card"`. Create variant dashes the panel border and soft accent wash.

## Non-goals

- App routing helpers
- Session layout preference (see `HubIndexLayoutSwitch`)
- Token-studio `EntityCard` / Brandion `AddTile` (different catalog density)

## Acceptance

1. Stories: Default / WithMedia / Create
2. Tests: title render; create variant class; link when `href`
3. Apps import from `@msqdx/ui`
