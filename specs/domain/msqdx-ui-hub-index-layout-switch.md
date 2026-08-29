# MSQDX UI — HubIndexLayoutSwitch

**Status:** Accepted — 2026-08-29  
**Layer:** Molecules  
**Origin:** Audion `HubIndexLayoutSwitch` / `.audion-editable-comm-layout-switch`  
**Catalog:** Molecules/HubIndexLayoutSwitch

## Purpose

Exclusive **Cards | List** control for product hub index surfaces (projects, personas, compositions, …). Session persistence stays in the consuming app.

## API

| Prop | Type | Notes |
|------|------|--------|
| `value` | `'cards' \| 'list'` | Active layout |
| `onChange` | `(next) => void` | |
| `cardsLabel` | `ReactNode` | Default `Cards` |
| `listLabel` | `ReactNode` | Default `List` |
| `aria-label` | `string` | Group label (required for a11y when labels are icons later) |
| `className` | `string` | |

## Behavior

- Pill group with two `aria-pressed` buttons
- Active option uses filled ink treatment (Audion chrome)

## Acceptance

1. Stories: Cards selected / List selected
2. Click switches `onChange`
3. Consuming apps import from `@msqdx/ui`
