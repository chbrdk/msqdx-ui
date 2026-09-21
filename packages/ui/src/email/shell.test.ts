import { describe, expect, it } from 'vitest'
import {
  emailButton,
  emailCodePanel,
  emailParagraph,
  msqdxEmailPalette,
  MSQDX_EMAIL_LOGO_MARK_URL,
  renderMsqdxEmailDocument,
} from './index'

describe('msqdx email shell', () => {
  it('uses brand orange accent and neutral canvas', () => {
    expect(msqdxEmailPalette.accent).toBe('#ff6a3b')
    expect(msqdxEmailPalette.canvas).toBe('#f8f6f0')
    expect(msqdxEmailPalette.card).toBe('#ffffff')
  })

  it('always embeds the MSQ DX logo by default (non-plygrnd host)', () => {
    expect(MSQDX_EMAIL_LOGO_MARK_URL).toMatch(/^https:\/\//)
    expect(MSQDX_EMAIL_LOGO_MARK_URL).not.toMatch(/plygrnd\.tech/)
    expect(MSQDX_EMAIL_LOGO_MARK_URL).toContain('msqdx-mark.png')

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
    expect(html).toContain('MSQ DX')
    expect(html).toContain('Code für dein Konto')
    expect(html).toContain('tok_abc')
    expect(html).toContain(msqdxEmailPalette.accent)
    expect(html).toContain(msqdxEmailPalette.canvas)
    expect(html).toContain(`src="${MSQDX_EMAIL_LOGO_MARK_URL}"`)
    // Header + footer logos
    expect(html.split(`src="${MSQDX_EMAIL_LOGO_MARK_URL}"`).length - 1).toBe(2)
    expect(html).not.toMatch(/plygrnd\.tech/)
  })

  it('allows suppressing or overriding the logo URL', () => {
    const none = renderMsqdxEmailDocument({
      productLabel: 'PLEXON',
      title: 'T',
      bodyHtml: emailParagraph('x'),
      logoSrc: '',
    })
    expect(none).not.toContain('<img ')

    const custom = renderMsqdxEmailDocument({
      productLabel: 'PLEXON',
      title: 'T',
      bodyHtml: emailParagraph('x'),
      logoSrc: 'https://cdn.example.com/mark.png',
    })
    expect(custom).toContain('src="https://cdn.example.com/mark.png"')
  })

  it('escapes user text and button hrefs', () => {
    expect(emailParagraph('A <B> & "C"')).toContain('A &lt;B&gt; &amp; &quot;C&quot;')
    expect(emailButton('Go', 'https://example.com/?a=1&b=2')).toContain(
      'href="https://example.com/?a=1&amp;b=2"'
    )
  })
})
