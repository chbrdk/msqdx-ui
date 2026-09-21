# MSQDX UI — transactional HTML email shell

**Status:** Accepted · 2026-09-21  
**Layer:** Shared design (email, not React DOM)  
**Consumers:** PLEXON transactional mailer (`lib/mail/`) and any MSQ product sending HTML mail  
**Tokens:** `msqdxBrand` / light semantic theme (`packages/ui/src/tokens`)

## Goal

One **table-based, inline-CSS** HTML email document that reads as MSQ DX (neutral canvas, orange accent, clear type) across Gmail / Outlook / Apple Mail / Mimecast. React components are **not** used in the MIME body — only hex from the design-token SSOT.

## Layout (single column)

1. Full-width outer table, background `neutral` (`#f8f6f0`).
2. Centered card ≤ **600px**, white surface, light border.
3. Top **accent bar** (`orange` `#ff6a3b`).
4. Header: product wordmark (text) + optional eyebrow.
5. Body blocks: lede, paragraphs, code panel, optional CTA button, meta rows.
6. Footer: short muted note (no mandatory deep links).

## Invariants

1. **Inline styles** for all critical paint (clients strip `<style>` unevenly).
2. Layout tables use `role="presentation"`.
3. Always ship a **plain-text** alternative in the consumer mailer.
4. **No flex/grid** in the email document.
5. CTA buttons are HTML `<a>` with padded cell — not image buttons.
6. Brand hex MUST come from `msqdxBrand` / email palette helper — do not invent parallel oranges.
7. Deliverability constraints (e.g. Mimecast blocking `*.plygrnd.tech` URLs) are **consumer policy**; the shell MAY omit CTAs when `href` is absent.

## API (TypeScript)

```ts
import { renderMsqdxEmailDocument, emailParagraph, emailCodePanel, emailButton } from '@msqdx/ui'

renderMsqdxEmailDocument({
  productLabel: 'PLEXON',
  title: 'Code für dein Konto',
  preheader: 'Dein Code zum Zurücksetzen…',
  bodyHtml: [emailParagraph('…'), emailCodePanel(token)].join(''),
  footerNote: 'PLEXON · MSQ DX',
})
```

## Non-goals

- Marketing / newsletter campaigns (Listmonk, CREATION craft)
- Dark-mode-only designs as baseline
- Embedding Wave icons as SVG (many clients strip or block)

## Related

- Knowledge: `knowledge/email.md`
- Brand tokens: `packages/ui/src/tokens/brand.ts`
- Plexon ops: `plexon-v3/knowledge/transactional-email.md`
