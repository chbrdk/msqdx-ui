import type { Meta, StoryObj } from '@storybook/react-vite'
import { PrintPage, PrintRankedList } from './PrintPrimitives'

const meta = {
  title: 'Print/RankedList',
  component: PrintRankedList,
  tags: ['print', 'magazine'],
} satisfies Meta<typeof PrintRankedList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PrintPage>
      <PrintRankedList
        items={[
          {
            label: 'FAQ-Schema ergänzen',
            meta: 'Strukturierte Antworten für generative Modelle.',
          },
          { label: 'Autorenboxen auf Ratgeberseiten', meta: 'E-E-A-T Erfahrung' },
          { label: 'Liefer- und Montageversprechen klarer machen' },
        ]}
      />
    </PrintPage>
  ),
}
