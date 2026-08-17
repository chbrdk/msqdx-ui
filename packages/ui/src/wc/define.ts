/**
 * Thin Custom Element runtime for compiled catalog tags.
 * Shadow DOM + slot; styling via inherited CSS custom properties.
 * Not a second React implementation.
 */

import type { WcManifestEntry } from './compile'

function createCatalogElement(): CustomElementConstructor {
  return class MsqdxCatalogElement extends HTMLElement {
    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      const host = document.createElement('div')
      host.setAttribute('part', 'host')
      host.append(document.createElement('slot'))
      root.append(host)
    }
  }
}

export function defineMsqdxCatalogElements(manifest: readonly WcManifestEntry[]): void {
  for (const entry of manifest) {
    if (customElements.get(entry.tagName)) continue
    customElements.define(entry.tagName, createCatalogElement())
  }
}
