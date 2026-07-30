/**
 * Guards CSS theme literals ↔ design-system/tokens SemanticTheme (Wave D SoT).
 * Knowledge: msqdx-ui-product-sot.md
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  forestChart,
  forestStatus,
  msqdxBrand,
  msqdxDark,
  msqdxLight,
  msqdxStatus,
  msqdxV2Dark,
  msqdxV2Light,
  type SemanticTheme,
} from './index'
import { chartTokensFor, statusColorsFor } from '../../theme/msqdxTokens'

const tokensCss = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../css/tokens.css'),
  'utf8',
)

function themeBlock(themeId: string): string {
  if (themeId === 'msqdx') {
    const m = tokensCss.match(
      /:root,\s*\[data-theme='msqdx'\]\s*\{([\s\S]*?)\n\}/,
    )
    return m?.[1] ?? ''
  }
  const m = tokensCss.match(
    new RegExp(`\\[data-theme='${themeId}'\\]\\s*\\{([\\s\\S]*?)\\n\\}`),
  )
  return m?.[1] ?? ''
}

function cssVar(block: string, name: string): string | undefined {
  const m = block.match(new RegExp(`${name}:\\s*([^;]+);`))
  return m?.[1]?.trim()
}

const PAIRS: Array<[string, SemanticTheme]> = [
  ['msqdx', msqdxLight],
  ['msqdx-dark', msqdxDark],
  ['msqdx-ui', msqdxV2Light],
  ['msqdx-ui-dark', msqdxV2Dark],
]

describe('token SoT Wave D — CSS ↔ TS palette', () => {
  it.each(PAIRS)('%s bg0/bg1/ink/accent/muted/ok/danger match SemanticTheme', (id, theme) => {
    const block = themeBlock(id)
    expect(block.length).toBeGreaterThan(40)
    expect(cssVar(block, '--bg0')).toBe(theme.bg0)
    expect(cssVar(block, '--bg1')).toBe(theme.bg1)
    expect(cssVar(block, '--ink')).toBe(theme.ink)
    expect(cssVar(block, '--accent')).toBe(theme.accent)
    expect(cssVar(block, '--muted')).toBe(theme.muted)
    expect(cssVar(block, '--ok')).toBe(theme.ok)
    expect(cssVar(block, '--danger')).toBe(theme.danger)
    expect(cssVar(block, '--accent')).toBe(msqdxBrand.orange)
  })

  it('status + chart helpers read design-system maps', () => {
    expect(statusColorsFor('msqdx')).toBe(msqdxStatus)
    expect(statusColorsFor('forest')).toBe(forestStatus)
    expect(chartTokensFor('msqdx-dark')).toEqual(msqdxDark.chart)
    expect(chartTokensFor('msqdx-ui-dark')).toEqual(msqdxV2Dark.chart)
    expect(chartTokensFor('forest')).toEqual(forestChart)
  })

  it('exports status from design-system barrel', () => {
    expect(msqdxStatus.COMPLETED).toBe(msqdxBrand.green)
    expect(forestStatus.ENRICH_QUEUED).toBe('#c4a35a')
  })
})
