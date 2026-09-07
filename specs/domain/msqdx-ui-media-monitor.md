# MSQDX UI — MediaMonitor

**Status:** Active  
**Layer:** Organisms

## Purpose

Program/source monitor frame: label row, media surface slot, optional HUD overlay. Not a video player.

## API

- `label: ReactNode`
- `actions?: ReactNode` — e.g. fullscreen `ToolButton`
- `media?: ReactNode` — `<video>` / placeholder
- `hud?: ReactNode`
- `fullscreen?: boolean` — visual state class

## Acceptance

1. Domain-free shell; apps own refs, URLs, jog/shuttle.
2. CSS tokens only (`--bg*`, `--line`, `--fg`, `--muted`).
