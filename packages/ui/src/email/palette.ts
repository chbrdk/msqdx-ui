/**
 * Email-safe palette — hex only (clients do not resolve CSS variables).
 * SSOT mirrors `msqdxBrand` + light semantic theme.
 */
import { msqdxBrand } from '../tokens/brand'
import { msqdxLight } from '../tokens/colors'

export const msqdxEmailPalette = {
  canvas: msqdxBrand.neutral,
  card: msqdxLight.bg1,
  ink: msqdxLight.ink,
  muted: msqdxLight.muted,
  accent: msqdxBrand.orange,
  accentContrast: msqdxBrand.white,
  line: 'rgba(15, 23, 42, 0.12)',
  codeSurface: '#fff7f3',
  ok: msqdxBrand.green,
  font:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
} as const

export type MsqdxEmailPalette = typeof msqdxEmailPalette
