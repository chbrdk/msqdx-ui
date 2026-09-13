import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { bumpCreationPin } from './pin-bump-creation.mjs'

test('bumpCreationPin rewrites Dockerfile ARG and paths.msqdxUiRefDefault', () => {
  const root = mkdtempSync(join(tmpdir(), 'pin-bump-'))
  const dockerfile = join(root, 'Dockerfile')
  const pathsTs = join(root, 'paths.ts')
  const oldSha = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  const newSha = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
  writeFileSync(
    dockerfile,
    `# CREATION\nARG MSQDX_UI_REF=${oldSha}\nARG PNPM_VERSION=10.16.1\n# runner\nARG MSQDX_UI_REF=${oldSha}\n`,
  )
  writeFileSync(
    pathsTs,
    `export const paths = {\n  msqdxUiRefDefault: '${oldSha}',\n} as const\n`,
  )
  const result = bumpCreationPin({ dockerfile, pathsTs, sha: newSha })
  assert.equal(result.sha, newSha)
  const dockerOut = readFileSync(dockerfile, 'utf8')
  assert.equal([...dockerOut.matchAll(new RegExp(`ARG MSQDX_UI_REF=${newSha}`, 'g'))].length, 2)
  assert.doesNotMatch(dockerOut, new RegExp(oldSha))
  assert.match(readFileSync(pathsTs, 'utf8'), new RegExp(`msqdxUiRefDefault: '${newSha}'`))
})

test('bumpCreationPin rejects a non-SHA', () => {
  assert.throws(() => bumpCreationPin({ dockerfile: 'x', pathsTs: 'y', sha: 'main' }), /40-char/)
})
