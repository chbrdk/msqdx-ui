import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { CATALOG } from './catalog'

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Barrel component modules that must appear in CATALOG (by id). */
const REQUIRED_BARREL_STORY_IDS = [
  'AppFrame',
  'NavRail',
  'BrandCorner',
  'TopStatus',
  'KpiStrip',
  'PipelinePanel',
  'StatusMeterPanel',
  'DivergingBar',
  'Lede',
  'Icons',
] as const

describe('catalogCompleteness', () => {
  it('every catalog entry has co-located stories + mdx files', () => {
    const missing: string[] = []
    for (const entry of CATALOG) {
      const storiesPath = join(srcRoot, entry.stories)
      const mdxPath = join(srcRoot, entry.mdx)
      if (!existsSync(storiesPath)) missing.push(`stories:${entry.id} → ${entry.stories}`)
      if (!existsSync(mdxPath)) missing.push(`mdx:${entry.id} → ${entry.mdx}`)
    }
    expect(missing).toEqual([])
  })

  it('catalog titles match layer/name convention', () => {
    for (const entry of CATALOG) {
      expect(entry.title.startsWith(`${entry.layer}/`)).toBe(true)
    }
  })

  it('shell / overview / viz barrel gaps are catalogued', () => {
    const ids = new Set(CATALOG.map((e) => e.id))
    for (const id of REQUIRED_BARREL_STORY_IDS) {
      expect(ids.has(id), `missing catalog id: ${id}`).toBe(true)
    }
  })

  it('catalog ids are unique', () => {
    const ids = CATALOG.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('P1 promoted stories import from the same folder (./Type)', () => {
    const files: string[] = []
    const walk = (dir: string) => {
      for (const ent of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, ent.name)
        if (ent.isDirectory()) walk(p)
        else if (ent.name.endsWith('.promoted.stories.tsx')) files.push(p)
      }
    }
    walk(srcRoot)
    expect(files.length).toBeGreaterThan(0)
    for (const file of files) {
      const text = readFileSync(file, 'utf8')
      expect(text, file).not.toContain("from '../components/")
      expect(text, file).toMatch(/from '\.\//)
      expect(text, file).not.toMatch(/<[A-Z][A-Za-z0-9]*[\s/>]/)
    }
  })
})
