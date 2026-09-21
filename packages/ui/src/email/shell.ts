/**
 * MSQDX transactional HTML email document (table + inline CSS).
 * Spec: specs/domain/msqdx-ui-email.md
 */

import { msqdxEmailPalette as p } from './palette'

export type MsqdxEmailDocumentInput = {
  /** Product wordmark in the header, e.g. PLEXON */
  productLabel: string
  /** Visible H1 inside the card */
  title: string
  /** Inbox preview line (hidden in many clients below fold) */
  preheader?: string
  /** Already-built HTML blocks (paragraphs, code panel, button, …) */
  bodyHtml: string
  footerNote?: string
  /** Optional eyebrow above the title */
  eyebrow?: string
}

function esc(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderMsqdxEmailDocument(input: MsqdxEmailDocumentInput): string {
  const product = esc(input.productLabel)
  const title = esc(input.title)
  const preheader = esc(input.preheader ?? '')
  const footer = esc(input.footerNote ?? `${input.productLabel} · MSQ DX`)
  const eyebrow = input.eyebrow
    ? `<p style="margin:0 0 8px 0;font-family:${p.font};font-size:12px;line-height:1.3;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:${p.accent};">${esc(input.eyebrow)}</p>`
    : ''

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <!--[if mso]><style type="text/css">table,td{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${p.canvas};">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background-color:${p.canvas};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:collapse;background-color:${p.card};border:1px solid ${p.line};border-radius:12px;overflow:hidden;">
          <tr>
            <td bgcolor="${p.accent}" style="background-color:${p.accent};height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <p style="margin:0 0 20px 0;font-family:${p.font};font-size:13px;line-height:1.3;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${p.ink};">${product}</p>
              ${eyebrow}
              <h1 style="margin:0 0 20px 0;font-family:${p.font};font-size:24px;line-height:1.25;font-weight:700;color:${p.ink};">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px 28px;">
              ${input.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;border-top:1px solid ${p.line};">
              <p style="margin:16px 0 0 0;font-family:${p.font};font-size:12px;line-height:1.45;color:${p.muted};">${footer}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
