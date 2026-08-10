# ChatOverlay

Organism for domain-free chat flyout / overlay shells.

**Spec:** `specs/domain/msqdx-ui-chat-overlay.md`  
**CSS:** `packages/ui/src/css/chat.css` (`.chat-overlay*`, `.chat-panel-compact`)  
**Consumers:** Plexon / Audion / Checkion / Brandion `PlatformAssistantHost` (central assistant hybrid flyout).

## Notes

- Default placement is **dock-end** (classical side flyout), default width `min(32rem, 100%)`, drag-resizable up to ~92vw / 64rem (persisted).
- Surfaces use tokens (`--panel` / `--bg1`, `--line`, `--ink`, `--overlay-scrim`) so light/dark follow host `data-theme`.
- Body is a slot — composed compact chat panel **or** iframe to Plexon `/assistant/embed`.
- Do not put assistant/domain logic in this package.
