#!/usr/bin/env node
/**
 * Bump CREATION MSQDX_UI_REF (Dockerfile ARG + paths.msqdxUiRefDefault).
 * Used by .github/workflows/pin-bump-creation.yml. Never auto-merges.
 * Spec: specs/domain/library-composition-roundtrip.md Phase 6.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const SHA_RE = /^[0-9a-f]{40}$/i
const DOCKER_PIN_RE = /^(ARG MSQDX_UI_REF=)[0-9a-f]{40}$/im
const PATHS_PIN_RE = /(msqdxUiRefDefault:\s*')[0-9a-f]{40}(')/i

export function assertSha(sha) {
  const value = String(sha || '').trim()
  if (!SHA_RE.test(value)) {
    throw new Error(`MSQDX_UI_REF must be a 40-char git SHA, got: ${sha}`)
  }
  return value.toLowerCase()
}

export function bumpCreationPin({ dockerfile, pathsTs, sha }) {
  const next = assertSha(sha)
  const dockerPrev = readFileSync(dockerfile, 'utf8')
  if (!DOCKER_PIN_RE.test(dockerPrev)) {
    throw new Error(`Dockerfile missing ARG MSQDX_UI_REF=<sha>: ${dockerfile}`)
  }
  const dockerNext = dockerPrev.replace(DOCKER_PIN_RE, `$1${next}`)
  const pathsPrev = readFileSync(pathsTs, 'utf8')
  if (!PATHS_PIN_RE.test(pathsPrev)) {
    throw new Error(`paths.ts missing msqdxUiRefDefault SHA: ${pathsTs}`)
  }
  const pathsNext = pathsPrev.replace(PATHS_PIN_RE, `$1${next}$2`)
  writeFileSync(dockerfile, dockerNext)
  writeFileSync(pathsTs, pathsNext)
  return { sha: next, dockerfile, pathsTs }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sha = process.argv[2]
  const dockerfile = process.argv[3]
  const pathsTs = process.argv[4]
  if (!sha || !dockerfile || !pathsTs) {
    console.error('Usage: pin-bump-creation.mjs <sha> <Dockerfile> <paths.ts>')
    process.exit(1)
  }
  const result = bumpCreationPin({ dockerfile, pathsTs, sha })
  console.log(`Pinned MSQDX_UI_REF=${result.sha}`)
}
