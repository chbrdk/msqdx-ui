import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'
import { INSPECT_GLYPH_SIZE } from './InspectLayoutGlyphs'
import {
  IconAlignLeft,
  IconBold,
  IconCamera,
  IconCheck,
  IconJustifyCenter,
  IconMic,
  IconOverview,
  IconPersonas,
  IconPlus,
  IconSend,
  IconSpaceBetween,
  IconSparkles,
  IconStorybook,
  IconType,
  IconUndo,
  IconVideo,
  IconWarning,
  IconWidth,
} from './icons'
import { Text } from './Text'

const CUSTOM_WAVE3 = [
  { name: 'IconOverview', Node: IconOverview },
  { name: 'IconPersonas', Node: IconPersonas },
  { name: 'IconSend', Node: IconSend },
  { name: 'IconMic', Node: IconMic },
  { name: 'IconVideo', Node: IconVideo },
  { name: 'IconCamera', Node: IconCamera },
  { name: 'IconWidth', Node: IconWidth },
  { name: 'IconSparkles', Node: IconSparkles },
] as const

const RESIDUAL_ICONS = [
  { name: 'IconAlignLeft', Node: IconAlignLeft },
  { name: 'IconJustifyCenter', Node: IconJustifyCenter },
  { name: 'IconSpaceBetween', Node: IconSpaceBetween },
  { name: 'IconStorybook', Node: IconStorybook },
] as const

const meta = {
  title: 'Foundation/Icons',
  parameters: {
    docs: {
      description: {
        component:
          'Custom Waves 1–3 share the inspect-glyph stroke language. Residual Lucide wraps are Align/Justify only (Wave 4). Spec: msqdx-ui-icon-language.md',
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
  items: readonly { name: string; Node: ComponentType<{ size?: number }> }[]
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

export const CustomLanguage: Story = {
  name: 'Custom language (Wave 1–2 sample)',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconPlus', Node: IconPlus },
        { name: 'IconCheck', Node: IconCheck },
        { name: 'IconType', Node: IconType },
        { name: 'IconBold', Node: IconBold },
        { name: 'IconUndo', Node: IconUndo },
        { name: 'IconWarning', Node: IconWarning },
      ]}
      size={20}
    />
  ),
}

export const CustomWave2: Story = {
  name: 'Custom language (Wave 2 sample)',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconBold', Node: IconBold },
        { name: 'IconType', Node: IconType },
        { name: 'IconUndo', Node: IconUndo },
        { name: 'IconWarning', Node: IconWarning },
      ]}
      size={20}
    />
  ),
}

export const CustomWave3: Story = {
  name: 'Custom language (Wave 3)',
  render: () => <IconGrid items={CUSTOM_WAVE3} size={20} />,
}

export const CustomLarge: Story = {
  name: 'Custom large (48px)',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconPlus', Node: IconPlus },
        { name: 'IconBold', Node: IconBold },
        { name: 'IconOverview', Node: IconOverview },
        { name: 'IconVideo', Node: IconVideo },
        { name: 'IconWidth', Node: IconWidth },
        { name: 'IconSparkles', Node: IconSparkles },
      ]}
      size={INSPECT_GLYPH_SIZE.xl}
    />
  ),
}

export const SizeLadder: Story = {
  name: 'Size ladder (16 → 48)',
  render: () => {
    const samples = [IconPlus, IconBold, IconOverview, IconVideo, IconWarning] as const
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

export const Gallery: Story = {
  name: 'Residual Lucide (Align matrix)',
  render: () => <IconGrid items={RESIDUAL_ICONS} size={20} />,
}
