import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Font } from '@react-pdf/renderer'

/** DS stack twin — Noto Sans (latin subset) for Magazin-PDF. */
export const MAG_FONT_FAMILY = 'NotoSans'

let registered = false

function magFontsDir(): string {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), 'fonts')
}

export function registerMagazinePdfFonts(): void {
  if (registered) return
  const dir = magFontsDir()
  const regular = path.join(dir, 'NotoSans-Regular.ttf')
  const bold = path.join(dir, 'NotoSans-Bold.ttf')
  if (!fs.existsSync(regular) || !fs.existsSync(bold)) {
    throw new Error(
      `Mag PDF fonts missing under ${dir} (expected NotoSans-Regular.ttf + NotoSans-Bold.ttf)`,
    )
  }
  Font.register({
    family: MAG_FONT_FAMILY,
    fonts: [
      { src: regular, fontWeight: 400 },
      { src: bold, fontWeight: 700 },
    ],
  })
  registered = true
}
