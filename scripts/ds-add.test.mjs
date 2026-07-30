import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { scaffoldComponent } from './ds-add.mjs'

function seedRepo(root) {
  mkdirSync(join(root, 'packages', 'ui', 'src', 'components'), { recursive: true })
  mkdirSync(join(root, 'packages', 'ui', 'src', 'css'), { recursive: true })
  mkdirSync(join(root, 'packages', 'ui', 'src', 'storybook'), { recursive: true })
  mkdirSync(join(root, 'specs', 'domain'), { recursive: true })
  mkdirSync(join(root, 'knowledge'), { recursive: true })
  writeFileSync(join(root, 'packages', 'ui', 'src', 'css', 'components.css'), '/* base */\n')
  writeFileSync(
    join(root, 'packages', 'ui', 'src', 'index.ts'),
    "export { CATALOG, VIEWPORT_CRITICAL } from './storybook/catalog'\nexport type { CatalogEntry, CatalogLayer } from './storybook/catalog'\n",
  )
  writeFileSync(
    join(root, 'packages', 'ui', 'src', 'storybook', 'catalog.ts'),
    "export const CATALOG = [\n]\n\nexport const VIEWPORT_CRITICAL = CATALOG.filter(Boolean)\n",
  )
}

test('scaffoldComponent creates files and updates barrel/catalog', () => {
  const root = mkdtempSync(join(tmpdir(), 'msqdx-ui-'))
  seedRepo(root)

  const result = scaffoldComponent(root, 'SignalBadge', 'atoms')

  assert.equal(result.layer, 'atoms')
  assert.match(readFileSync(join(root, 'packages', 'ui', 'src', 'index.ts'), 'utf8'), /SignalBadge/)
  assert.match(readFileSync(join(root, 'packages', 'ui', 'src', 'storybook', 'catalog.ts'), 'utf8'), /Atoms\/SignalBadge/)
  assert.match(readFileSync(join(root, 'packages', 'ui', 'src', 'css', 'components.css'), 'utf8'), /\.ds-signal-badge/)
  assert.match(readFileSync(join(root, 'specs', 'domain', 'msqdx-ui-signal-badge.md'), 'utf8'), /SignalBadge/)
  assert.match(readFileSync(join(root, 'knowledge', 'components', 'signal-badge.md'), 'utf8'), /SignalBadge/)
})
