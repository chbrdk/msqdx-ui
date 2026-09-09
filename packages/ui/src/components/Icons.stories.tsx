import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'
import { INSPECT_GLYPH_SIZE } from './InspectLayoutGlyphs'
import {
  IconAlignLeft,
  IconBell,
  IconBold,
  IconBot,
  IconChat,
  IconClose,
  IconFolderPlus,
  IconGroup,
  IconHamburger,
  IconMenu,
  IconMessage,
  IconMessageCircle,
  IconMessagePlus,
  IconOverview,
  IconPlay,
  IconPlus,
  IconScissors,
  IconSpaceBetween,
  IconSparkles,
  IconStar,
  IconStorybook,
  IconVideo,
  IconWarning,
  IconXCircle,
} from './icons'
import { Text } from './Text'

const ALIGN_ICONS = [
  { name: 'IconAlignLeft', Node: IconAlignLeft },
  { name: 'IconSpaceBetween', Node: IconSpaceBetween },
] as const

const WAVE5_ICONS = [
  { name: 'IconPlay', Node: IconPlay },
  { name: 'IconScissors', Node: IconScissors },
  { name: 'IconMessage', Node: IconMessage },
  { name: 'IconGroup', Node: IconGroup },
  { name: 'IconFolderPlus', Node: IconFolderPlus },
  { name: 'IconStar', Node: IconStar },
  { name: 'IconBell', Node: IconBell },
] as const

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
  name: 'Custom sample',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconPlus', Node: IconPlus },
        { name: 'IconBold', Node: IconBold },
        { name: 'IconOverview', Node: IconOverview },
        { name: 'IconVideo', Node: IconVideo },
        { name: 'IconWarning', Node: IconWarning },
        { name: 'IconSparkles', Node: IconSparkles },
        { name: 'IconStorybook', Node: IconStorybook },
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
        { name: 'IconWarning', Node: IconWarning },
      ]}
      size={20}
    />
  ),
}

export const CustomWave3: Story = {
  name: 'Custom language (Wave 3 sample)',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconOverview', Node: IconOverview },
        { name: 'IconVideo', Node: IconVideo },
        { name: 'IconSparkles', Node: IconSparkles },
      ]}
      size={20}
    />
  ),
}

export const CustomWave4: Story = {
  name: 'Custom language (Wave 4 Align sample)',
  render: () => <IconGrid items={ALIGN_ICONS} size={20} />,
}

export const CustomWave5: Story = {
  name: 'Custom language (Wave 5 platform)',
  render: () => <IconGrid items={WAVE5_ICONS} size={20} />,
}

export const CustomWave6: Story = {
  name: 'Custom language (Wave 6 chat/chrome)',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconClose', Node: IconClose },
        { name: 'IconMenu', Node: IconMenu },
        { name: 'IconHamburger', Node: IconHamburger },
        { name: 'IconMessage', Node: IconMessage },
        { name: 'IconChat', Node: IconChat },
        { name: 'IconMessageCircle', Node: IconMessageCircle },
        { name: 'IconMessagePlus', Node: IconMessagePlus },
        { name: 'IconBot', Node: IconBot },
        { name: 'IconXCircle', Node: IconXCircle },
      ]}
      size={20}
    />
  ),
}

export const CustomLarge: Story = {
  name: 'Custom large (48px)',
  render: () => (
    <IconGrid
      items={[
        { name: 'IconPlus', Node: IconPlus },
        { name: 'IconAlignLeft', Node: IconAlignLeft },
        { name: 'IconPlay', Node: IconPlay },
        { name: 'IconSpaceBetween', Node: IconSpaceBetween },
        { name: 'IconVideo', Node: IconVideo },
      ]}
      size={INSPECT_GLYPH_SIZE.xl}
    />
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

export const Gallery: Story = {
  name: 'Align matrix (Wave 4)',
  render: () => <IconGrid items={ALIGN_ICONS} size={20} />,
}
