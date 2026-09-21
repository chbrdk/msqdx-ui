/**
 * Email-safe palette — hex only (clients do not resolve CSS variables).
 * SSOT mirrors `msqdxBrand` + light semantic theme.
 */
import { msqdxBrand } from '../tokens/brand'
import { msqdxLight } from '../tokens/colors'

export const msqdxEmailPalette = {
  /** Outer page wash */
  canvas: msqdxBrand.neutral,
  /** Card surface */
  card: msqdxBrand.white,
  ink: msqdxLight.ink,
  muted: msqdxLight.muted,
  accent: msqdxBrand.orange,
  accentContrast: msqdxBrand.white,
  /** Soft rule */
  line: '#e8e4db',
  /** Stronger hairline under header */
  lineStrong: '#d9d4c8',
  /** Code / OTP well */
  codeSurface: '#fff5f0',
  codeBorder: '#ffd4c4',
  /** Subtle header wash behind logo lockup */
  headerWash: '#fbfaf7',
  ok: msqdxBrand.green,
  font:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
} as const

export type MsqdxEmailPalette = typeof msqdxEmailPalette
