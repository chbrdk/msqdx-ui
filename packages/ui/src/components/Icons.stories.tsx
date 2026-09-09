import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'
import { INSPECT_GLYPH_SIZE } from './InspectLayoutGlyphs'
import * as IconExports from './icons'
import { IconAlignLeft, IconPlus, IconSpaceBetween, IconWarning } from './icons'
import { Text } from './Text'

type IconComponent = ComponentType<{ size?: number }>

const ALL_ICONS = Object.entries(IconExports)
  .filter(([name, value]) => name.startsWith('Icon') && typeof value === 'function')
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, Node]) => ({ name, Node: Node as IconComponent }))

const meta = {
  title: 'Foundation/Icons',
  parameters: {
    docs: {
      description: {
        component:
          'All Icon* exports are custom (`ds-ui-icon`). Lucide dependency removed. Spec: msqdx-ui-icon-language.md',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function IconGrid({
  items,
  size = 20,
}: {
  items: readonly { name: string; Node: IconComponent }[]
  size?: number
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
        gap: '1rem',
        color: 'var(--ink)',
      }}
    >
      {items.map(({ name, Node }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            border: '1px solid var(--line)',
            borderRadius: 8,
            background: 'var(--bg1)',
          }}
        >
          <Node size={size} />
          <Text role="meta" as="span">
            {name}
          </Text>
        </div>
      ))}
    </div>
  )
}

/** Full catalog — every `Icon*` export from `@msqdx/ui`. */
export const All: Story = {
  name: 'All icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text role="meta">
        {ALL_ICONS.length} icons · size {INSPECT_GLYPH_SIZE.md}px
      </Text>
      <IconGrid items={ALL_ICONS} size={INSPECT_GLYPH_SIZE.md} />
    </div>
  ),
}

export const SizeLadder: Story = {
  name: 'Size ladder (16 → 48)',
  render: () => {
    const samples = [IconPlus, IconAlignLeft, IconSpaceBetween, IconWarning] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: 'var(--ink)' }}>
        {(
          [
            ['sm', INSPECT_GLYPH_SIZE.sm],
            ['md', INSPECT_GLYPH_SIZE.md],
            ['lg', INSPECT_GLYPH_SIZE.lg],
            ['xl', INSPECT_GLYPH_SIZE.xl],
          ] as const
        ).map(([token, size]) => (
          <div key={token}>
            <Text role="meta">
              {token} · {size}px
            </Text>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, alignItems: 'center' }}>
              {samples.map((Node, i) => (
                <Node key={i} size={size} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
