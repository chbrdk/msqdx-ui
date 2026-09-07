# MSQDX UI — TransportBar

**Status:** Active  
**Layer:** Molecules

## Purpose

Horizontal chrome for media transport: control group, timecode slot, optional trailing marks / extras.

## API

- `controls?: ReactNode`
- `timecode?: ReactNode`
- `trailing?: ReactNode`
- `className?`, `aria-label?`

## Acceptance

1. Layout only — play/pause/seek logic stays in the app.
2. Prefer composing `ToolButton` + `Timecode` as children.
