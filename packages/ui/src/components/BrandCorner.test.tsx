import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrandCorner } from './BrandCorner'

const frameCss = readFileSync(path.resolve(__dirname, '../css/frame.css'), 'utf8')
const ultraCss = readFileSync(path.resolve(__dirname, '../css/ultra-wide.css'), 'utf8')

describe('BrandCorner', () => {
  it('renders plaque with label', () => {
    render(<BrandCorner label="AUDION" />)
    expect(screen.getByTestId('brand-corner')).toBeTruthy()
    expect(screen.getByText('AUDION')).toBeTruthy()
  })

  it('CSS keeps plaque flush (no 1px border gap at viewport edge)', () => {
    expect(frameCss).toMatch(/\.brand-corner\s*\{[^}]*top:\s*0/)
    expect(frameCss).toMatch(/\.brand-corner\s*\{[^}]*right:\s*0/)
    expect(frameCss).toMatch(/\.brand-corner-box\s*\{[^}]*border:\s*0/)
    expect(frameCss).not.toMatch(/\.brand-corner-box\s*\{[^}]*border:\s*1px/)
    expect(ultraCss).toMatch(/\.brand-corner-box\s*\{[^}]*border:\s*0/)
  })
})
