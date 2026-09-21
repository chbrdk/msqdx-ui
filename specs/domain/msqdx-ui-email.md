# MSQDX UI — transactional HTML email shell

**Status:** Accepted · 2026-09-21 (logo lockup + theme polish)  
**Layer:** Shared design (email, not React DOM)  
**Consumers:** PLEXON transactional mailer (`lib/mail/`) and any MSQ product sending HTML mail  
**Tokens:** `msqdxBrand` / light semantic theme (`packages/ui/src/tokens`)

## Goal

One **table-based, inline-CSS** HTML email document that reads as MSQ DX (neutral canvas, orange accent, logo lockup, clear type) across Gmail / Outlook / Apple Mail / Mimecast. React components are **not** used in the MIME body — only hex from the design-token SSOT.

## Layout (single column)

1. Full-width outer table, background `neutral` (`#f8f6f0`).
2. Centered card ≤ **600px**, white surface, soft border, 16px radius.
3. Top **accent bar** (`orange` `#ff6a3b`, 5px).
4. **Header lockup (always):** MSQ DX mark image + `MSQ DX` + product label (e.g. PLEXON), on a light wash.
5. Title + optional eyebrow; body blocks (paragraphs, code panel, CTA, meta rows).
6. **Footer lockup:** small mark + muted note.

## Logo

- Default `logoSrc` = `MSQDX_EMAIL_LOGO_MARK_URL` (PNG via jsDelivr → this repo `packages/ui/src/email/assets/msqdx-mark.png`).
- Host must **not** be `*.plygrnd.tech` (Mimecast DOC-1369 rejects those URLs in the body).
- Override with any safe HTTPS PNG; pass `logoSrc: ''` only to suppress (not recommended).
- Wordmark PNG: `MSQDX_EMAIL_LOGO_WORDMARK_URL` (optional for wide layouts).

## Invariants

1. **Inline styles** for all critical paint (clients strip `<style>` unevenly).
2. Layout tables use `role="presentation"`.
3. Always ship a **plain-text** alternative in the consumer mailer.
4. **No flex/grid** in the email document.
5. CTA buttons are HTML `<a>` with padded cell (+ Outlook VML when needed) — not image buttons.
6. Brand hex MUST come from `msqdxBrand` / email palette helper — do not invent parallel oranges.
7. Deliverability constraints (e.g. Mimecast blocking `*.plygrnd.tech` URLs) are **consumer policy**; the shell MAY omit CTAs when `href` is absent.
8. Logo is **on by default** in every document.

## API (TypeScript)

```ts
import {
  renderMsqdxEmailDocument,
  emailParagraph,
  emailCodePanel,
  emailButton,
  MSQDX_EMAIL_LOGO_MARK_URL,
} from '@msqdx/ui'

renderMsqdxEmailDocument({
  productLabel: 'PLEXON',
  title: 'Code für dein Konto',
  preheader: 'Dein Code zum Zurücksetzen…',
  bodyHtml: [emailParagraph('…'), emailCodePanel(token)].join(''),
  footerNote: 'PLEXON · MSQ DX',
  // logoSrc defaults to MSQDX_EMAIL_LOGO_MARK_URL
})
```

## Non-goals

- Marketing / newsletter campaigns (Listmonk, CREATION craft)
- Dark-mode-only designs as baseline
- Embedding Wave icons as SVG (many clients strip or block)

## Related

- Knowledge: `knowledge/email.md` · paths in `knowledge/paths.md`
- Brand tokens: `packages/ui/src/tokens/brand.ts`
- Assets: `packages/ui/src/email/assets/`
- Plexon ops: `plexon-v3/knowledge/transactional-email.md`
