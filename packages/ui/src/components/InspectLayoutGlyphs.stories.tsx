import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  GridColumnGlyph,
  GridSpanGlyph,
  MediaFitGlyph,
  SizeModeGlyph,
  columnGlyphForPresetLabel,
  mediaFitLabel,
} from './InspectLayoutGlyphs'
import { Text } from './Text'

const meta = {
  title: 'Foundation/Inspect Layout Glyphs',
  parameters: {
    docs: {
      description: {
        component:
          'Theme-aware inspect diagrams. Strong fills use `--ink` (readable on light and dark). Accents use `--accent`. Switch the Storybook theme toolbar to verify.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Tile({
  label,
  children,
  active,
}: {
  label: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <div
      className={active ? 'ds-inspect-glyph-tile is-active' : 'ds-inspect-glyph-tile'}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        minWidth: 48,
        padding: '6px 8px',
        borderRadius: 6,
        border: active
          ? '1px solid color-mix(in srgb, var(--accent) 55%, var(--line))'
          : '1px solid var(--line)',
        background: active
          ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
          : 'var(--bg1)',
        color: 'var(--ink)',
        fontSize: 11,
      }}
    >
      {children}
      <span>{label}</span>
    </div>
  )
}

export const SizeModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text role="meta">Width axis</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['hug', 'fill', 'fixed'] as const).map((id, i) => (
          <Tile key={id} label={id} active={i === 1}>
            <SizeModeGlyph id={id} axis="width" />
          </Tile>
        ))}
      </div>
      <Text role="meta">Height axis</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['hug', 'fill', 'fixed'] as const).map((id) => (
          <Tile key={id} label={id}>
            <SizeModeGlyph id={id} axis="height" />
          </Tile>
        ))}
      </div>
    </div>
  ),
}

export const MediaFit: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['cover', 'contain', 'auto', 'fill', 'none', 'scale-down'] as const).map((id, i) => (
        <Tile key={id} label={mediaFitLabel(id)} active={i === 0}>
          <MediaFitGlyph id={id} />
        </Tile>
      ))}
    </div>
  ),
}

export const GridColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {[
        '1 Col',
        '2 Col',
        '3 Col',
        '4 Col',
        '6 Col',
        '12 Col',
        'Auto-Fit',
        'Auto-Fill',
        '1 : 2',
        '2 : 1',
        'Sidebar',
        '3-Pane',
      ].map((label, i) => (
        <Tile key={label} label={label} active={i === 2}>
          <GridColumnGlyph id={columnGlyphForPresetLabel(label)} />
        </Tile>
      ))}
    </div>
  ),
}

export const GridSpan: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text role="meta">Column span</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['span-auto', 'span-1', 'span-2', 'span-3', 'span-4', 'span-full'] as const).map(
          (id) => (
            <Tile key={id} label={id.replace('span-', '')}>
              <GridSpanGlyph id={id} axis="col" />
            </Tile>
          ),
        )}
      </div>
      <Text role="meta">Row span</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['span-auto', 'span-1', 'span-2', 'span-3', 'span-full'] as const).map((id) => (
          <Tile key={id} label={id.replace('span-', '')}>
            <GridSpanGlyph id={id} axis="row" />
          </Tile>
        ))}
      </div>
    </div>
  ),
}

export const AllFamilies: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Text role="title">Size</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <SizeModeGlyph id="hug" />
          <SizeModeGlyph id="fill" />
          <SizeModeGlyph id="fixed" />
        </div>
      </div>
      <div>
        <Text role="title">Fit</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <MediaFitGlyph id="cover" />
          <MediaFitGlyph id="contain" />
          <MediaFitGlyph id="fill" />
        </div>
      </div>
      <div>
        <Text role="title">Grid</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <GridColumnGlyph id="cols-3" />
          <GridColumnGlyph id="sidebar" />
          <GridSpanGlyph id="span-2" axis="col" />
        </div>
      </div>
    </div>
  ),
}
