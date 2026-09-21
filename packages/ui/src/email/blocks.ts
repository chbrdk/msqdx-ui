import { msqdxEmailPalette as p } from './palette'

function esc(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Body paragraph (plain text → escaped HTML). */
export function emailParagraph(text: string): string {
  return `<p style="margin:0 0 16px 0;font-family:${p.font};font-size:16px;line-height:1.55;color:${p.ink};">${esc(text)}</p>`
}

/** Large code / OTP panel (no links). */
export function emailCodePanel(code: string, caption?: string): string {
  const cap = caption
    ? `<p style="margin:0 0 8px 0;font-family:${p.font};font-size:13px;line-height:1.4;color:${p.muted};">${esc(caption)}</p>`
    : ''
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;border-collapse:collapse;">
  <tr>
    <td style="background-color:${p.codeSurface};border:1px solid ${p.line};border-left:4px solid ${p.accent};border-radius:8px;padding:16px 18px;">
      ${cap}
      <p style="margin:0;font-family:${p.mono};font-size:22px;line-height:1.35;letter-spacing:0.04em;font-weight:700;color:${p.ink};word-break:break-all;">${esc(code)}</p>
    </td>
  </tr>
</table>`
}

/** Primary CTA — omit when deliverability policy forbids the href domain. */
export function emailButton(label: string, href: string): string {
  const safeHref = esc(href)
  const safeLabel = esc(label)
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px 0;border-collapse:collapse;">
  <tr>
    <td bgcolor="${p.accent}" style="background-color:${p.accent};border-radius:8px;">
      <a href="${safeHref}" style="display:inline-block;padding:12px 22px;font-family:${p.font};font-size:15px;font-weight:700;line-height:1.2;color:${p.accentContrast};text-decoration:none;">${safeLabel}</a>
    </td>
  </tr>
</table>`
}

export function emailMetaRow(label: string, value: string): string {
  return `<tr>
  <td style="padding:6px 0;font-family:${p.font};font-size:13px;line-height:1.4;color:${p.muted};width:36%;vertical-align:top;">${esc(label)}</td>
  <td style="padding:6px 0;font-family:${p.font};font-size:14px;line-height:1.4;color:${p.ink};vertical-align:top;">${esc(value)}</td>
</tr>`
}

export function emailMetaTable(rows: Array<{ label: string; value: string }>): string {
  if (!rows.length) return ''
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;border-collapse:collapse;">
  ${rows.map((r) => emailMetaRow(r.label, r.value)).join('')}
</table>`
}
