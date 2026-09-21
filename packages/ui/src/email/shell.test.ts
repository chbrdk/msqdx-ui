import { describe, expect, it } from 'vitest'
import {
  emailButton,
  emailCodePanel,
  emailParagraph,
  msqdxEmailPalette,
  renderMsqdxEmailDocument,
} from './index'

describe('msqdx email shell', () => {
  it('uses brand orange accent and neutral canvas', () => {
    expect(msqdxEmailPalette.accent).toBe('#ff6a3b')
    expect(msqdxEmailPalette.canvas).toBe('#f8f6f0')
  })

  it('renders a table document with product label, title, and code panel', () => {
    const html = renderMsqdxEmailDocument({
      productLabel: 'PLEXON',
      title: 'Code für dein Konto',
      preheader: 'Dein Code lautet ABC',
      bodyHtml: [emailParagraph('Hallo,'), emailCodePanel('tok_abc', 'Code')].join(''),
      footerNote: 'PLEXON · MSQ DX',
    })
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('role="presentation"')
    expect(html).toContain('PLEXON')
    expect(html).toContain('Code für dein Konto')
    expect(html).toContain('tok_abc')
    expect(html).toContain(msqdxEmailPalette.accent)
    expect(html).toContain(msqdxEmailPalette.canvas)
  })

  it('escapes user text and button hrefs', () => {
    expect(emailParagraph('A <B> & "C"')).toContain('A &lt;B&gt; &amp; &quot;C&quot;')
    expect(emailButton('Go', 'https://example.com/?a=1&b=2')).toContain(
      'href="https://example.com/?a=1&amp;b=2"'
    )
  })
})
