/**
 * DS-DEPOSIT D6 — drift between committed deposit mirrors and @msqdx/ui-tokens.
 * Does not call Brandion API. Canonical regenerate: brandion-v3 `npm run ds:deposit:regenerate`.
 * Operator: brandion-v3/knowledge/ds-deposit-d6-operator.md
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  msqdxBrand,
  msqdxDark,
  msqdxLight,
  radii,
  spacing,
} from '../src/index'

const depositDir = path.dirname(fileURLToPath(import.meta.url))
const darkPackPath = path.join(depositDir, 'msq-dx-deposit.dtcg.json')
const lightPackPath = path.join(depositDir, 'msq-dx-deposit-light.dtcg.json')

const EXPECTED_LEAF_COUNT = 140
const REGENERATE_HINT =
  'Deposit mirror drifted from ui-tokens. In brandion-v3 with sibling msqdx-ui: npm run ds:deposit:regenerate'

type Nested = Record<string, unknown>

function dig(doc: Nested, dotted: string): Nested | undefined {
  let cur: unknown = doc
  for (const part of dotted.split('.')) {
    if (!cur || typeof cur !== 'object') return undefined
    cur = (cur as Nested)[part]
  }
  return cur as Nested | undefined
}

function digitalHex(doc: Nested, dotted: string): string | undefined {
  const node = dig(doc, dotted)
  const value = node?.$value as { digital?: { hex?: string; rgba?: string } } | undefined
  return value?.digital?.hex ?? value?.digital?.rgba
}

function digitalSpacing(doc: Nested, step: string): string | undefined {
  const node = dig(doc, `spacing.static.${step}`)
  const value = node?.$value as { digital?: string } | undefined
  return value?.digital
}

function countLeaves(node: unknown): number {
  if (!node || typeof node !== 'object') return 0
  const obj = node as Nested
  if ('$type' in obj && '$value' in obj) return 1
  let n = 0
  for (const [key, child] of Object.entries(obj)) {
    if (key.startsWith('$')) continue
    n += countLeaves(child)
  }
  return n
}

describe('DS-DEPOSIT D6 — deposit mirror drift', () => {
  it('dark pack brand hex + key semantics match msqdxBrand / msqdxDark', () => {
    const doc = JSON.parse(readFileSync(darkPackPath, 'utf8')) as Nested
    expect(countLeaves(doc), REGENERATE_HINT).toBe(EXPECTED_LEAF_COUNT)

    for (const [key, hex] of Object.entries(msqdxBrand)) {
      expect(digitalHex(doc, `color.brand.${key}`)?.toLowerCase()).toBe(hex.toLowerCase())
    }
    expect(digitalHex(doc, 'color.background')?.toLowerCase()).toBe(msqdxDark.bg0.toLowerCase())
    expect(digitalHex(doc, 'color.ink')?.toLowerCase()).toBe(msqdxDark.ink.toLowerCase())
    expect(digitalHex(doc, 'color.action.primary')?.toLowerCase()).toBe(
      msqdxDark.accent.toLowerCase(),
    )
    expect(digitalHex(doc, 'color.status.ok')?.toLowerCase()).toBe(msqdxDark.ok.toLowerCase())
    expect(digitalHex(doc, 'color.surface.base')?.toLowerCase()).toBe(msqdxDark.bg1.toLowerCase())

    for (const [step, value] of Object.entries(spacing)) {
      expect(digitalSpacing(doc, step)).toBe(value)
    }
    expect(
      (dig(doc, 'radius.control.sm')?.$value as { digital?: string })?.digital,
    ).toBe(radii.sm)
  })

  it('light twin pack uses msqdxLight semantics with same brand hex', () => {
    const doc = JSON.parse(readFileSync(lightPackPath, 'utf8')) as Nested
    expect(countLeaves(doc), REGENERATE_HINT).toBe(EXPECTED_LEAF_COUNT)
    expect(digitalHex(doc, 'color.background')?.toLowerCase()).toBe(msqdxLight.bg0.toLowerCase())
    expect(digitalHex(doc, 'color.ink')?.toLowerCase()).toBe(msqdxLight.ink.toLowerCase())
    expect(digitalHex(doc, 'color.brand.green')?.toLowerCase()).toBe(
      msqdxBrand.green.toLowerCase(),
    )
    expect(digitalHex(doc, 'color.action.primary')?.toLowerCase()).toBe(
      msqdxLight.accent.toLowerCase(),
    )
  })
})
