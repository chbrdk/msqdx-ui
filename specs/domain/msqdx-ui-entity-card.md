# MSQDX UI — EntityCard

**Status:** Accepted — 2026-08-10  
**Layer:** Molecules  
**Origin:** Brandion `TokenCard` face chrome (path, meta, actions, preview slot)  
**Catalog:** Molecules/EntityCard

## Purpose

Magazine catalog card shell: meta row + title + optional toolbar + body preview + footer actions. Domain previews (color swatch, type specimen) are **slots**.

## Non-goals

- Design-token parsing / channel metrics.
- Flip / 3D card animation.

## API

| Prop | Notes |
|------|--------|
| `meta` | Type / kind label |
| `title` | Path or name |
| `badge` | Optional pending / status chip |
| `headActions` | Icon buttons (edit, …) |
| `toolbar` | Channel toggle etc. |
| `children` | Preview face |
| `footer` | Approve / actions row |
| `size` | `default` \| `tall` (layout chapters) |

## Acceptance

Stories ColorPreview / TypePreview / WithActions; unit test exposes title.
