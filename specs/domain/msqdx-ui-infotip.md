# MSQDX UI — InfoTip

**Status:** Accepted — 2026-08-04  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/InfoTip.tsx` · CSS `.ds-infotip`  
**Knowledge:** `knowledge/components/infotip.md`

## Purpose

Compact help affordance: a ghost icon button that shows a short tip on **hover and focus**. Composition of existing `Tooltip` + ghost `Button` + `IconInfo`. Language-agnostic — callers pass `content` and `label`; apps own copy and locale.

Use for jargon/metric labels. Not a click Flyout, Dialog, or long-form help panel.

## API

| Prop | Type | Notes |
|------|------|-------|
| `content` | `ReactNode` | Tip body (short; 1–2 sentences typical) |
| `label` | `string` | **Required** trigger `aria-label` |
| `size` | `'sm' \| 'md'` | Maps to ghost `Button` size; default `sm` |
| `className` | `string` | Root `.ds-infotip` |

## States

- Idle: icon trigger only
- Open: Tooltip bubble visible while hovered or focused

## Accessibility

- Trigger is a focusable `button` with required `aria-label`
- Tip opens on hover **and** keyboard focus (via `Tooltip`)
- Tip content is not interactive; keep copy short

## Visual

| Part | Treatment |
|------|-----------|
| Root | `.ds-infotip` inline-flex align with adjacent label |
| Trigger | Borderless compact ghost `Button` + smaller `IconInfo` (12px) |
| Bubble | Existing `.ds-tooltip-bubble` |

## Non-goals

- Localized strings inside `@msqdx/ui`
- Click-to-pin Flyout / long docs
- Replacing inline always-on formula paragraphs in product UIs

## Acceptance

1. Storybook Default shows tip on hover/focus.  
2. Vitest: trigger has `aria-label`; tip content appears on focus.  
3. Consuming apps import `InfoTip` / `IconInfo` from `@msqdx/ui`.  
