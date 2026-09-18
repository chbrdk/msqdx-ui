# `ds-inspect-density` — shared Field chrome

**Date:** 2026-09-18 · Spec: `specs/domain/msqdx-ui-property-inspector.md`

## Why

Magazine `Field` defaults (orange uppercase micro-labels + firm bottom rule) are too loud for design-tool rails. `PropertyInspector` historically scoped quieter density under `.ds-property-inspector` only — floating panels (e.g. CREATION Chart studio) missed that chrome and looked like a different form system.

## Contract

- Class: `ds-inspect-density`
- Applied on `PropertyInspector` root (alongside `ds-property-inspector`)
- Consumers MAY add the class on any dense authoring surface that reuses `Field` / `Select` / `TokenPicker`
- CSS lives in `packages/ui/src/css/components.css`: muted Title Case labels, icon left of label (`flex-row` + `nowrap`), full-width controls

## CREATION

Chart studio body: `creation-chart-studio__body ds-inspect-density` · quieter input borders mirrored under `.creation-chart-studio` in `apps/web/app/globals.css` · `knowledge/chart-studio-panel.md`
