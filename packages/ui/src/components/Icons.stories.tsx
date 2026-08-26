import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconCheck,
  IconClose,
  IconEdit,
  IconHistory,
  IconInfo,
  IconJourneys,
  IconMic,
  IconMoodboard,
  IconOverview,
  IconPersonas,
  IconProjects,
  IconResearch,
  IconSend,
  IconShare,
  IconTrash,
  IconVideo,
  IconUndo,
  IconAlignLeft,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconGhost,
  IconBan,
  IconStorybook,
} from './icons'
import { Text } from './Text'

const ICONS = [
  { name: 'IconOverview', Node: IconOverview },
  { name: 'IconPersonas', Node: IconPersonas },
  { name: 'IconProjects', Node: IconProjects },
  { name: 'IconJourneys', Node: IconJourneys },
  { name: 'IconResearch', Node: IconResearch },
  { name: 'IconSend', Node: IconSend },
  { name: 'IconShare', Node: IconShare },
  { name: 'IconHistory', Node: IconHistory },
  { name: 'IconMoodboard', Node: IconMoodboard },
  { name: 'IconMic', Node: IconMic },
  { name: 'IconVideo', Node: IconVideo },
  { name: 'IconInfo', Node: IconInfo },
  { name: 'IconEdit', Node: IconEdit },
  { name: 'IconTrash', Node: IconTrash },
  { name: 'IconCheck', Node: IconCheck },
  { name: 'IconClose', Node: IconClose },
  { name: 'IconUndo', Node: IconUndo },
  { name: 'IconAlignLeft', Node: IconAlignLeft },
  { name: 'IconItalic', Node: IconItalic },
  { name: 'IconUnderline', Node: IconUnderline },
  { name: 'IconStrikethrough', Node: IconStrikethrough },
  { name: 'IconGhost', Node: IconGhost },
  { name: 'IconBan', Node: IconBan },
  { name: 'IconStorybook', Node: IconStorybook },
] as const

const meta = {
  title: 'Foundation/Icons',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
        gap: '1rem',
      }}
    >
      {ICONS.map(({ name, Node }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            border: '1px solid var(--line)',
          }}
        >
          <Node size={20} />
          <Text role="meta" as="span">
            {name}
          </Text>
        </div>
      ))}
    </div>
  ),
}
