# MSQDX HTML email shell

**Spec:** `specs/domain/msqdx-ui-email.md`  
**Code:** `packages/ui/src/email/` (`renderMsqdxEmailDocument`, blocks, `MSQDX_EMAIL_LOGO_MARK_URL`)  
**Assets:** `packages/ui/src/email/assets/msqdx-mark.png` · `msqdx-wordmark.png`  
**Tokens:** `msqdxBrand` orange/neutral/ink — same SSOT as the product UI.  
**Storybook:** `Foundations/EmailShell`

## Constraints (2026 clients)

- Nested **presentation tables** + **inline CSS** only (no Flex/Grid for layout).
- ~600px fluid card; `bgcolor` + `background-color` for Outlook.
- Logo is **always on** by default (header + footer). Hosted **PNG** over HTTPS — never `*.plygrnd.tech` (Mimecast).
- Canonical mark URL: `MSQDX_EMAIL_LOGO_MARK_URL` → jsDelivr → GitHub `packages/ui/src/email/assets/msqdx-mark.png`.
- Plain-text multipart is required at the sender (PLEXON `lib/mail`).
- Keep HTML lean (Gmail clips ~102KB). Live text over image-only content.

## Theme notes

- Neutral canvas `#f8f6f0`, white card, 5px orange accent bar, soft header/footer wash.
- Product label sits under **MSQ DX** in the lockup; title is the only large headline.
- Code panel uses warm orange-tint well + accent rail.

**Plexon barrel:** `@msqdx/ui` → `plexon-v3/lib/msqdx-ui.ts` must re-export email helpers (same pitfall as chat molecules).
