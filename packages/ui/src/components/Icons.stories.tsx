import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'
import { INSPECT_GLYPH_SIZE } from './InspectLayoutGlyphs'
import {
  IconAlignLeft,
  IconArrowLeft,
  IconBold,
  IconCheck,
  IconChevronDown,
  IconClose,
  IconCopy,
  IconDanger,
  IconDownload,
  IconEdit,
  IconExternalLink,
  IconEye,
  IconFilter,
  IconGhost,
  IconHistory,
  IconHome,
  IconInfo,
  IconItalic,
  IconJourneys,
  IconLayers,
  IconLock,
  IconMenu,
  IconMic,
  IconMoodboard,
  IconMoreHorizontal,
  IconOverview,
  IconPersonas,
  IconPlus,
  IconProjects,
  IconRefresh,
  IconResearch,
  IconSave,
  IconSend,
  IconSettings,
  IconShare,
  IconSparkles,
  IconStorybook,
  IconStrikethrough,
  IconSuccess,
  IconTrash,
  IconType,
  IconUnderline,
  IconUndo,
  IconUpload,
  IconVideo,
  IconWarning,
  IconZoomIn,
} from './icons'
import { Text } from './Text'

const CUSTOM_WAVE1 = [
  { name: 'IconPlus', Node: IconPlus },
  { name: 'IconMoreHorizontal', Node: IconMoreHorizontal },
  { name: 'IconSettings', Node: IconSettings },
  { name: 'IconCopy', Node: IconCopy },
  { name: 'IconDownload', Node: IconDownload },
  { name: 'IconUpload', Node: IconUpload },
  { name: 'IconExternalLink', Node: IconExternalLink },
  { name: 'IconLayers', Node: IconLayers },
  { name: 'IconRefresh', Node: IconRefresh },
  { name: 'IconFilter', Node: IconFilter },
  { name: 'IconHome', Node: IconHome },
  { name: 'IconMenu', Node: IconMenu },
  { name: 'IconResearch', Node: IconResearch },
  { name: 'IconCheck', Node: IconCheck },
  { name: 'IconClose', Node: IconClose },
  { name: 'IconChevronDown', Node: IconChevronDown },
  { name: 'IconEdit', Node: IconEdit },
  { name: 'IconTrash', Node: IconTrash },
  { name: 'IconEye', Node: IconEye },
  { name: 'IconLock', Node: IconLock },
] as const

const CUSTOM_WAVE2 = [
  { name: 'IconType', Node: IconType },
  { name: 'IconBold', Node: IconBold },
  { name: 'IconItalic', Node: IconItalic },
  { name: 'IconUnderline', Node: IconUnderline },
  { name: 'IconStrikethrough', Node: IconStrikethrough },
  { name: 'IconUndo', Node: IconUndo },
  { name: 'IconSave', Node: IconSave },
  { name: 'IconZoomIn', Node: IconZoomIn },
  { name: 'IconArrowLeft', Node: IconArrowLeft },
  { name: 'IconInfo', Node: IconInfo },
  { name: 'IconSuccess', Node: IconSuccess },
  { name: 'IconWarning', Node: IconWarning },
  { name: 'IconDanger', Node: IconDanger },
] as const

const RESIDUAL_ICONS = [
  { name: 'IconOverview', Node: IconOverview },
  { name: 'IconPersonas', Node: IconPersonas },
  { name: 'IconProjects', Node: IconProjects },
  { name: 'IconJourneys', Node: IconJourneys },
  { name: 'IconSend', Node: IconSend },
  { name: 'IconShare', Node: IconShare },
  { name: 'IconHistory', Node: IconHistory },
  { name: 'IconMoodboard', Node: IconMoodboard },
  { name: 'IconMic', Node: IconMic },
  { name: 'IconVideo', Node: IconVideo },
  { name: 'IconAlignLeft', Node: IconAlignLeft },
  { name: 'IconGhost', Node: IconGhost },
  { name: 'IconSparkles', Node: IconSparkles },
  { name: 'IconStorybook', Node: IconStorybook },
] as const

const meta = {
  title: 'Foundation/Icons',
  parameters: {
    docs: {
      description: {
        component:
          'Custom Wave 1–2 icons share the inspect-glyph stroke language. Residual Icon* exports remain Lucide wraps until later migration waves. Spec: msqdx-ui-icon-language.md',
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
  name: 'Custom language (Wave 1)',
  render: () => <IconGrid items={CUSTOM_WAVE1} size={20} />,
}

export const CustomWave2: Story = {
  name: 'Custom language (Wave 2)',
  render: () => <IconGrid items={CUSTOM_WAVE2} size={20} />,
}

export const CustomLarge: Story = {
  name: 'Custom large (48px)',
  render: () => <IconGrid items={[...CUSTOM_WAVE1, ...CUSTOM_WAVE2]} size={INSPECT_GLYPH_SIZE.xl} />,
}

export const SizeLadder: Story = {
  name: 'Size ladder (16 → 48)',
  render: () => {
    const samples = [IconPlus, IconBold, IconUndo, IconWarning, IconType, IconCheck] as const
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
  name: 'Residual Lucide wraps',
  render: () => <IconGrid items={RESIDUAL_ICONS} size={20} />,
}
