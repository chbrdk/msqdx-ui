import { describe, expect, it } from 'vitest'
import React from 'react'
import { Document, renderToBuffer } from '@react-pdf/renderer'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as PrintPrimitives from '../print/PrintPrimitives'
import { printMagColors } from '../print/tokens'
import { PRINT_MAG_TWINS } from '../magazine/twins'
import * as Mag from './index'
import { MagChip, MagChipRow } from './MagChip'
import { MagCover } from './MagCover'
import { MagPage } from './MagPage'
import { MagThemeProvider, applyMagTheme, getMagTheme } from './MagTheme'
import { magColors, createMagStyles } from './tokens'
import { mergeMagazineColors } from '../magazine/colors'
import { registerMagazinePdfFonts } from './register-mag-fonts'

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('Print↔Mag color twin equality', () => {
  it('printMagColors and magColors share the same keys and values', () => {
    expect(Object.keys(printMagColors).sort()).toEqual(Object.keys(magColors).sort())
    for (const key of Object.keys(printMagColors) as (keyof typeof printMagColors)[]) {
      expect(magColors[key]).toEqual(printMagColors[key])
    }
  })
})

describe('Print↔Mag structural twin map', () => {
  it('every twin has Mag export + Print primitive + Print story/mdx files', () => {
    for (const twin of PRINT_MAG_TWINS) {
      expect(Mag[twin.magExport as keyof typeof Mag], `missing Mag ${twin.magExport}`).toBeTypeOf(
        'function',
      )
      if (twin.printExport) {
        expect(
          PrintPrimitives[twin.printExport as keyof typeof PrintPrimitives],
          `missing Print ${twin.printExport}`,
        ).toBeTypeOf('function')
      }
      const stories = join(srcRoot, 'print', `Print${twin.printStory}.stories.tsx`)
      const mdx = join(srcRoot, 'print', `Print${twin.printStory}.mdx`)
      expect(existsSync(stories), stories).toBe(true)
      expect(existsSync(mdx), mdx).toBe(true)
    }
  })

  it('MagPage is exported for page chrome (logo/footer)', () => {
    expect(Mag.MagPage).toBeTypeOf('function')
    expect(Mag.MagThemeProvider).toBeTypeOf('function')
    expect(Mag.mergeMagazineColors).toBeTypeOf('function')
  })
})

describe('Mag theme override', () => {
  it('createMagStyles + mergeMagazineColors apply accent override', () => {
    const merged = mergeMagazineColors({ accent: '#ff00aa', paper: '#fff8f0' })
    expect(merged.accent).toBe('#ff00aa')
    expect(merged.paper).toBe('#fff8f0')
    expect(merged.ink).toBe(magColors.ink)
    const styles = createMagStyles(merged)
    expect(styles.page).toBeTruthy()
    expect(styles.accentRule).toBeTruthy()
  })

  it('applyMagTheme sets and resets active palette', () => {
    applyMagTheme({ accent: '#abcdef' })
    expect(getMagTheme().colors.accent).toBe('#abcdef')
    applyMagTheme(null)
    expect(getMagTheme().colors.accent).toBe(magColors.accent)
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

  it('renders with MagThemeProvider color override', async () => {
    registerMagazinePdfFonts()
    const buffer = await renderToBuffer(
      <Document>
        <MagThemeProvider colors={{ accent: '#1122aa', paper: '#f0f4ff' }}>
          <MagPage footerTitle="theme-smoke" showLogo={false}>
            <MagCover
              eyebrow="Themed"
              title="Brand accent"
              kpis={[{ label: 'A', value: '1', ringValue: 40, ringMax: 100 }]}
            />
          </MagPage>
        </MagThemeProvider>
      </Document>,
    )
    const pdf = Buffer.from(buffer)
    expect(pdf.subarray(0, 4).toString('utf8')).toBe('%PDF')
  }, 30000)
})
