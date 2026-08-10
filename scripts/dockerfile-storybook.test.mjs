import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

test('Dockerfile builds packages then static Storybook and exposes 6006', () => {
  const dockerfile = readFileSync(join(root, 'Dockerfile'), 'utf8')
  assert.match(dockerfile, /pnpm build/)
  assert.match(dockerfile, /pnpm build-storybook/)
  assert.match(dockerfile, /pnpm rebuild esbuild/)
  assert.match(dockerfile, /NODE_OPTIONS=--max-old-space-size=4096/)
  assert.match(dockerfile, /storybook-static/)
  assert.match(dockerfile, /EXPOSE 6006/)
  assert.match(dockerfile, /HEALTHCHECK/)
  assert.match(dockerfile, /nginx/)
})

test('root package.json allowlists esbuild for pnpm 10 install scripts', () => {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  assert.deepEqual(pkg.pnpm?.onlyBuiltDependencies, ['esbuild'])
})

test('.dockerignore keeps packages (incl. .storybook) and drops docs/deps', () => {
  const ignore = readFileSync(join(root, '.dockerignore'), 'utf8')
  assert.match(ignore, /^node_modules$/m)
  assert.match(ignore, /^knowledge$/m)
  assert.match(ignore, /^specs$/m)
  assert.doesNotMatch(ignore, /\.storybook/)
  assert.doesNotMatch(ignore, /^packages$/m)
})

test('nginx listens on Storybook port 6006 and serves healthz', () => {
  const conf = readFileSync(join(root, 'docker/nginx-storybook.conf'), 'utf8')
  assert.match(conf, /listen 6006/)
  assert.match(conf, /location = \/healthz/)
})

test('paths.md documents staging Storybook URL placeholder', () => {
  const paths = readFileSync(join(root, 'knowledge/paths.md'), 'utf8')
  assert.match(paths, /ds\.projects-a\.plygrnd\.tech/)
  assert.match(paths, /URL_MSQDX_UI_STORYBOOK/)
  assert.match(paths, /6006/)
  assert.match(paths, /organisms-chatoverlay--dock-end/)
})
