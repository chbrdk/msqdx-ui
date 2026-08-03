import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconHistory,
  IconJourneys,
  IconMic,
  IconMoodboard,
  IconOverview,
  IconPersonas,
  IconProjects,
  IconResearch,
  IconSend,
  IconShare,
  IconVideo,
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
