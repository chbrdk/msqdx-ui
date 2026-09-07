# MSQDX UI — Timecode

**Status:** Active  
**Layer:** Atoms

## Purpose

Monospace readout for media position / duration. Formatting stays in the app; this primitive only presents the string.

## API

- `value: ReactNode` — primary readout
- `secondary?: ReactNode` — optional duration after separator
- `separator?: ReactNode` — default `/`

## Acceptance

1. Uses `ds-timecode` + numeric/mono text roles.
2. No frame-rate math inside the DS.
