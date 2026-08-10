# MSQ DX v2 — Chat chrome

**Spec:** `specs/domain/msqdx-ui-chat-chrome.md`  
**CSS:** `packages/ui/src/css/chat.css` (via `@msqdx/ui/styles.css`)  
**Status:** Implemented 2026-07-29 — overlay sheet + open editorial surface

| Part | DS |
|------|-----|
| Sheet composer | `<Textarea className="chat-composer">` + pill `<Button className="chat-send">` |
| Open surface | `.chat-panel.chat-panel-open` — no card; left/right turns; underline composer |
| Open send | `<Button className="chat-send chat-send-icon" icon={<IconSend />}>` |
| Expand | `.chat-form.is-expanded` / hover / focus-within |
| Empty / loading / error | `EmptyState.chat-empty` / `LoadingText` / `Alert` |
| Close (overlay) | `<Button variant="ghost" className="chat-close">` |

## Product split

- **DS owns:** turn typography, composer underline + expand, icon send chrome, turn-in motion.
- **Product owns:** persona picker, history link, shell min-height offset (`--chat-panel-open-min-height`), streaming/data.

Reference consumer: AUDION v3 `AudionChatPanel` · `knowledge/chat-surface.md` (audion-v3).

SoT product rules: `msqdx-ui-product-sot.md` (Wave B + open surface).

## Related

- Field · Button · foundation · ADR 0028 §19 · `msqdx-ui-completeness.md` · guard `chatChrome.test.ts`
- **ChatOverlay** organism: `specs/domain/msqdx-ui-chat-overlay.md` · `knowledge/components/chat-overlay.md`
