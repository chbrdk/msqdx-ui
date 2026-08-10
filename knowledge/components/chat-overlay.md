# ChatOverlay

Organism for domain-free chat flyout / overlay shells.

**Spec:** `specs/domain/msqdx-ui-chat-overlay.md`  
**CSS:** `packages/ui/src/css/chat.css` (`.chat-overlay*`, `.chat-panel-compact`)  
**Consumers:** Plexon / Audion / Checkion / Brandion `PlatformAssistantHost` (central assistant embed).

## Notes

- Default placement is **dock-end** (classical side flyout).
- Body is a slot — typically an iframe to Plexon `/assistant/embed` or composed compact chat markup.
- Do not put assistant/domain logic in this package.
