# MSQDX UI — CollectionHubCard

**Status:** Accepted — 2026-09-25  
**Layer:** Molecules  
**Origin:** Brandion / CHECKION / PLEXON magazine Collection project tiles  
**Catalog:** Molecules/CollectionHubCard

## Purpose

Shared **Collection / capability-project hub card** for product `/projects` magazines: domain kicker, status badge, display title, optional hint, metric row, and **multi-action** footer (`CardActions`). Distinct from `HubIndexCard` (whole-tile link, title/meta only — compositions, datasets, cuts).

Apps supply metrics icons/copy and action buttons; the primitive owns chrome and density.

## API

### `CollectionHubCard`

| Prop | Type | Notes |
|---|---|---|
| `title` | `ReactNode` | Required |
| `kicker` | `ReactNode` | Optional domain / eyebrow (uppercase meta) |
| `badge` | `ReactNode` | Optional status chip (e.g. capability sync) |
| `badgeStatus` | `string` | Optional `data-status` on badge wrapper |
| `hint` | `ReactNode` | Optional muted line under title |
| `stats` | `ReactNode` | Optional metric cells (`CollectionHubMetric`) |
| `actions` | `ReactNode` | Optional footer (`CardActions` children) |
| `variant` | `'default' \| 'create'` | Create = dashed add tile (`<button>`) |
| `className` | `string` | |
| create attrs | | `onClick`, `disabled`, … when `variant="create"` |

Default root is `<article>`. Create variant is `<button type="button">`.

### `CollectionHubMetric`

| Prop | Type | Notes |
|---|---|---|
| `icon` | `ReactNode` | Required |
| `value` | `ReactNode` | Required |
| `label` | `ReactNode` | Required |
| `linked` | `boolean` | Optional `data-linked` for muted/unlinked values |

### Layout helpers (CSS classes)

| Class | Role |
|---|---|
| `ds-collection-hub-grid` | Responsive tile grid |
| `ds-collection-hub-list` | Numbered magazine list (`ol`) |
| `ds-collection-hub-list-row` | List row shell |
| `ds-collection-hub-list-num` | Index `01` |

Use existing `HubIndexLayoutSwitch` for tiles/list preference.

## Anatomy

```
[ kicker                    badge ]
title
[ hint ]
── stats ──
  [icon] value  LABEL
  …
── actions ──
  CardActions / ghost buttons
```

Create variant: dashed borders, soft accent wash; title + hint only (no stats/actions required).

## Non-goals

- Sync / archive / picker business logic
- Product-specific metric icons
- App routing helpers
- Replacing `HubIndexCard` for non-project catalogs
- Session layout preference storage (apps + `HubIndexLayoutSwitch`)

## Acceptance

1. Stories: Default (kicker/badge/stats/actions), Create, Badge statuses
2. Tests: title; create class; metric slots; actions render
3. Apps import from `@msqdx/ui`; Brandion/Checkion/Plexon/Audion projects hubs consume it
