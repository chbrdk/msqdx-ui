import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = join(dirname(fileURLToPath(import.meta.url)))

describe('chat Storybook CSF titles', () => {
  it('uses flat titles that map to predictable story ids', () => {
    const catalog = readFileSync(join(root, 'ChatCatalog.stories.tsx'), 'utf8')
    const panel = readFileSync(join(root, 'ChatBlockPanel.stories.tsx'), 'utf8')
    const list = readFileSync(join(root, 'ChatBlockList.stories.tsx'), 'utf8')

    expect(catalog).toContain("title: 'Organisms/ChatCatalog'")
    expect(catalog).toContain('export const Inventory')
    expect(catalog).toContain('component: ChatBlockPanel')
    expect(panel).toContain("title: 'Molecules/ChatBlockPanel'")
    expect(panel).toContain('export const Findings')
    expect(list).toContain("title: 'Molecules/ChatBlockList'")
  })
})
