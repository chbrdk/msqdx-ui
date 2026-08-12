# Zaoly keep tags → `@msqdx/ui` mapping

**Status:** Wave E1 · **Date:** 2026-08-12  
**Source keep list:** Zaoly `knowledge/zaoly-v1.md` (70 tags)  
**Catalog SoT:** `packages/ui/src/index.ts` + `packages/ui/src/storybook/catalog.ts`

Status legend:

| Status | Meaning |
|--------|---------|
| `exists` | Same-named export; use directly as React scene type |
| `alias` | Map tag → existing primitive (no parallel clone) |
| `gap` | Needs `pnpm ds:add` (or follow-on) before editor Top-N / palette |

Priority for E2 gaps: **layout / actions / forms / surfaces** first (editor frequency).

## Shell

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-stage` | alias | `FlowBoardStage` / `CanvasViewport` (E3) | Editor artboard chrome → CanvasViewport |
| `ds-frame` | alias | `AppFrame` / `Panel` | Composition frame chrome, not product AppShell |

## Layout

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-stack` | exists | `Stack` | Top-N; flex column/row + gap tokens |
| `ds-grid` | exists | `Grid` | CSS grid wrapper |
| `ds-section` | alias | `SectionChrome` / `FormSection` | Prefer FormSection for forms |
| `ds-nav` | alias | `NavRail` / `MagazineContentsNav` | App nav vs magazine toc — pick by context |
| `ds-divider` | exists | `Divider` | |
| `ds-spacer` | exists | `Spacer` | Token-sized empty space |

## Actions

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-button` | exists | `Button` | Top-N |
| `ds-link` | exists | `Link` | Text link primitive |
| `ds-cta` | alias | `Button` | `variant="primary"` (or branded CTA story) |
| `ds-segmented-button` | alias | `ToggleGroup` | Exclusive segments |
| `ds-segment` | alias | `ToggleGroup` option / `Chip` | Child of segmented |
| `ds-chip` | exists | `Chip` | |

## Typography

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-text` | exists | `Text` | Top-N |
| `ds-heading` | exists | `Heading` | Semantic h1–h6 |
| `ds-label` | alias | `Text` (`role="label"`) / Field label | |
| `ds-quote` | alias | `ChatQuoteList` item / `Text` | Prefer Text + cite until dedicated Quote |
| `ds-kbd` | gap | `Kbd` | Low priority |
| `ds-code` | alias | `Text` (`role="mono"`) | Inline; block later |

## Forms

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-input` | exists | `Input` | Top-N |
| `ds-textarea` | exists | `Textarea` | |
| `ds-checkbox` | exists | `Checkbox` | |
| `ds-select` | exists | `Select` | |
| `ds-switch` | exists | `Switch` | |
| `ds-radio` | gap | `Radio` | Native radio + tokens |
| `ds-combobox` | gap | `Combobox` | Medium priority |
| `ds-field` | exists | `Field` | |
| `ds-radio-group` | gap | `RadioGroup` | With Radio |
| `ds-slider` | exists | `Slider` | |
| `ds-file` | gap | `FileInput` | Low/medium |

## Surfaces

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-card` | exists | `Card` | Top-N; distinct from `EntityCard` / `CardActions` |
| `ds-badge` | exists | `Badge` | Status / count pill — not Chip |
| `ds-callout` | alias | `Alert` | |

## Media

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-icon` | alias | Icons MDX / lucide wrappers in apps | Shared icon set follow-on |
| `ds-image` | exists | `Image` | Top-N |
| `ds-figure` | gap | `Figure` | Caption wrapper |
| `ds-video` | gap | `Video` | Later |
| `ds-audio` | gap | `Audio` | Later |
| `ds-avatar` | exists | `Avatar` | |

## Lists / Data

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-list` | alias | `RankedList` / plain `ul` + Stack | Composition list ≠ ranked |
| `ds-list-item` | alias | `RankedRow` / `li` | |
| `ds-table` | alias | `DataTable` | |
| `ds-thead` / `ds-tbody` / `ds-tr` / `ds-th` / `ds-td` | alias | `DataTable` internals | Not separate scene types |

## Feedback / Overlay

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-toast` | exists | `Toast` | |
| `ds-dialog` | exists | `Dialog` | |
| `ds-drawer` | alias | `Flyout` / `FloatingPanel` | Document drawer semantics later |
| `ds-tooltip` | exists | `Tooltip` | |
| `ds-popover` | alias | `Flyout` | |
| `ds-progress` | gap | `Progress` | Determinate bar |
| `ds-meter` | exists | `Meter` | |
| `ds-spinner` | exists | `Spinner` | |
| `ds-skeleton` | exists | `Skeleton` | |
| `ds-empty-state` | exists | `EmptyState` | |
| `ds-haptic` | alias | — | Platform API; no visual primitive |

## Navigation / Disclosure

| Tag | Status | `@msqdx/ui` | Notes |
|-----|--------|-------------|-------|
| `ds-tabs` | exists | `Tabs` | |
| `ds-tab` | alias | `Tabs` panels | |
| `ds-stepper` | alias | `WizardSteps` / `StepStrip` | |
| `ds-step` | alias | `StepStripItem` | |
| `ds-breadcrumb` | gap | `Breadcrumb` | Medium |
| `ds-breadcrumb-item` | alias | Breadcrumb child | |
| `ds-pagination` | gap | `Pagination` | Medium |
| `ds-menu` | alias | `ContextMenu` | |
| `ds-menu-item` | alias | `ContextMenu` item | |
| `ds-accordion` | exists | `Accordion` | |
| `ds-accordion-item` | alias | Accordion panels | |

## E2 priority queue (gaps)

1. **P0 (Top-N editor):** ~~`Stack`, `Card`, `Heading`, `Image`, `Link`, `Badge`, `Spacer`, `Grid`~~ — **shipped Wave E2**
2. **P1:** `Radio` + `RadioGroup`, `Progress`, `Breadcrumb`, `Figure`
3. **P2:** `Combobox`, `FileInput`, `Kbd`, `Video`, `Audio`, `Pagination`

## Counts (approx.)

| Status | Count |
|--------|-------|
| exists | ~22 |
| alias | ~30 |
| gap | ~18 |

Exact tag count from keep list = **70** (table/list child tags counted as aliases).

## Related

- Program: creation-v3 `specs/domain/editor-migration.md`
- Chrome: `specs/domain/msqdx-ui-creation-editor-chrome.md`
- Storybook: `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`)
