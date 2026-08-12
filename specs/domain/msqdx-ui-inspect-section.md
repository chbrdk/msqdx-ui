# MSQDX UI — InspectSection

**Status:** Accepted — 2026-08-12  
**Layer:** Molecules  
**Consumers:** CREATION `/editor` property inspect (section chrome)  
**Related:** `msqdx-ui-property-inspector.md` · `msqdx-ui-form-section.md` · `msqdx-ui-creation-editor-chrome.md`

## Purpose

Dense titled block **inside** `PropertyInspector` (or similar aside): section title + body stack for fields. Penpot-like inspect chrome — quieter and tighter than dialog `FormSection`.

## Non-goals

- Field catalogs / section id taxonomy (app owns `component` / `layout` / …).
- Replacing `FormSection` (dialog / Brandion editor remains separate).
- Collapsible accordion behavior (follow-up if needed).

## API

| Prop | Notes |
|------|--------|
| `title` | Section heading |
| `titleId` | Optional id for `aria-labelledby` |
| `children` | Fields / TokenPickers / etc. |
| `className` | Optional |

Root is `<section>` with dense title + body gap.

## Density vs FormSection

| | InspectSection | FormSection |
|--|----------------|-------------|
| Context | Right inspect rail | Dialogs / forms |
| Padding / type | Compact, uppercase-ish quiet title | Comfortable dialog section |
| Columns | Single stack (app may grid inside) | Optional `columns` grid |

## Acceptance

1. Stories: Default + stacked in PropertyInspector.
2. Unit test renders title + children with `ds-inspect-section` class.
3. Consuming apps import `InspectSection` from `@msqdx/ui`.
