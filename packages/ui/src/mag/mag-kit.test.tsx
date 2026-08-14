import { describe, expect, it } from 'vitest'
import React from 'react'
import { Document, renderToBuffer } from '@react-pdf/renderer'
import { printMagColors } from '../print/tokens'
import { magColors } from './tokens'
import { MagChip, MagChipRow } from './MagChip'
import { MagCover } from './MagCover'
import { MagPage } from './MagPage'
import { registerMagazinePdfFonts } from './register-mag-fonts'

describe('magazine twin colors', () => {
  it('printMagColors and magColors share the same keys and values', () => {
    expect(Object.keys(printMagColors).sort()).toEqual(Object.keys(magColors).sort())
    for (const key of Object.keys(printMagColors) as (keyof typeof printMagColors)[]) {
      expect(magColors[key]).toEqual(printMagColors[key])
    }
  })
})

describe('Mag PDF kit smoke', () => {
  it('registers fonts and renders MagChip + MagCover to PDF', async () => {
    registerMagazinePdfFonts()
    const buffer = await renderToBuffer(
      <Document>
        <MagPage footerTitle="mag-kit-smoke">
          <MagChipRow>
            <MagChip>Smoke</MagChip>
          </MagChipRow>
          <MagCover
            eyebrow="Quick Check"
            title="Magazin kit"
            kpis={[{ label: 'Score', value: '72', ringValue: 72, ringMax: 100 }]}
          />
        </MagPage>
      </Document>,
    )
    const pdf = Buffer.from(buffer)
    expect(pdf.subarray(0, 4).toString('utf8')).toBe('%PDF')
    expect(pdf.length).toBeGreaterThan(500)
  }, 30000)
})
