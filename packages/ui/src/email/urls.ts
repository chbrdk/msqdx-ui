/**
 * Canonical hosted email asset URLs (HTTPS, never *.plygrnd.tech — Mimecast).
 * Knowledge: knowledge/email.md · knowledge/paths.md
 */

/** MSQ DX mark (PNG) — pin via jsDelivr from this repo path. */
export const MSQDX_EMAIL_LOGO_MARK_URL =
  'https://cdn.jsdelivr.net/gh/chbrdk/msqdx-ui@main/packages/ui/src/email/assets/msqdx-mark.png'

/** MSQ DX wordmark (PNG). Prefer mark + text lockup in the shell; wordmark for wide headers. */
export const MSQDX_EMAIL_LOGO_WORDMARK_URL =
  'https://cdn.jsdelivr.net/gh/chbrdk/msqdx-ui@main/packages/ui/src/email/assets/msqdx-wordmark.png'

/** Corporate site (footer link optional — omit when deliverability forbids links). */
export const URL_MSQDX_SITE = 'https://www.msqdx.com/en'
