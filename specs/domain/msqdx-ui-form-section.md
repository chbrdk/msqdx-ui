# MSQDX UI — FormSection

**Status:** Accepted — 2026-08-10  
**Layer:** Molecules  
**Origin:** Brandion token Add/Edit dialog section chrome (`brandion-token-editor-section`)  
**Catalog:** Molecules/FormSection

## Purpose

Quiet titled block inside Dialogs / editors: section title + body grid for fields.

## Non-goals

- Token type schemas / Brandion contracts.
- Replacing `Field` itself.

## API

| Prop | Notes |
|------|--------|
| `title` | Section heading |
| `titleId` | Optional id for `aria-labelledby` |
| `children` | Fields / content |
| `columns` | Body grid columns (default 1; identity often 2) |
| `tone` | `default` \| `advanced` (muted / collapsible-adjacent) |

## Acceptance

Stories Default / TwoColumn / AdvancedTone; unit test renders title + children.
