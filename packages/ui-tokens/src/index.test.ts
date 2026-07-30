import { describe, expect, it } from 'vitest'
import { typeSteps } from './index'

describe('ui tokens', () => {
  it('re-exports typography scale', () => {
    expect(typeSteps.display).toContain('clamp(')
  })
})
