# MSQDX HTML email shell

**Spec:** `specs/domain/msqdx-ui-email.md`  
**Code:** `packages/ui/src/email/` (`renderMsqdxEmailDocument`, `emailParagraph`, `emailCodePanel`, `emailButton`, `emailMetaTable`)  
**Tokens:** `msqdxBrand` orange/neutral/ink — same SSOT as the product UI.  
**Storybook:** `Foundations/EmailShell`

## Constraints (2026 clients)

- Nested **presentation tables** + **inline CSS** only (no Flex/Grid for layout).
- ~600px fluid card; `bgcolor` + `background-color` for Outlook.
- Plain-text multipart is required at the sender (PLEXON `lib/mail`).
- Keep HTML lean (Gmail clips ~102KB). Live text over image-only content.

Transactional HTML mail is not React. PLEXON consumes the shell for password-reset / team mails. Mimecast and similar filters may still reject bodies that contain blocked URL domains — omit CTAs when required (`password_reset` is code-only).

**Plexon barrel:** `@msqdx/ui` → `plexon-v3/lib/msqdx-ui.ts` must re-export email helpers (same pitfall as chat molecules).
