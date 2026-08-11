import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from './Button'
import { ChatBlockList } from './ChatBlockList'
import { ChatBlockPanel } from './ChatBlockPanel'
import { ChatKeyValueList } from './ChatKeyValueList'
import { ChatMetricGrid } from './ChatMetricGrid'
import { ChatOverlay } from './ChatOverlay'
import { ChatStepList } from './ChatStepList'
import { Text } from './Text'
import { Textarea } from './Textarea'

/**
 * Discovery catalog — browse chat chrome + message blocks in one place.
 * Spec: specs/domain/msqdx-ui-chat-chrome.md · chat-block-*.md · chat-metric/kv/step
 *
 * Story id: organisms-chatcatalog--inventory
 */
const meta = {
  title: 'Organisms/ChatCatalog',
  component: ChatBlockPanel,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChatBlockPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Inventory: Story = {
  args: {
    title: 'Chat inventory',
    eyebrow: 'catalog',
    children: null,
  },
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '40rem' }}>
      <header style={{ display: 'grid', gap: '0.35rem' }}>
        <Text role="title" size="xl" as="h2">
          Chat inventory
        </Text>
        <Text role="meta" as="p">
          Shell: ChatOverlay · Blocks: ChatBlockPanel / List / MetricGrid / KeyValueList /
          StepList. Also under Molecules/Chat* and Organisms/ChatOverlay.
        </Text>
      </header>

      <ChatBlockPanel title="Erkenntnisse" eyebrow="findings">
        <ChatBlockList
          items={[
            {
              title: 'GEO Gesamt-Score steigern (aktuell 62/100)',
              description:
                'Der Score liegt deutlich unter dem Wettbewerbs-Schnitt. Maßnahmen priorisieren.',
              badge: 'Warnung',
              tone: 'warning',
            },
            {
              title: 'Citations in Antworten erhöhen',
              description: 'Modelle zitieren die Domain selten — On-Page-Signale nachschärfen.',
              badge: 'Hinweis',
              tone: 'info',
            },
          ]}
        />
      </ChatBlockPanel>

      <ChatBlockPanel title="GEO Kennzahlen" eyebrow="metrics">
        <ChatMetricGrid
          items={[
            { label: 'GEO Score', value: 62, unit: '/100', tone: 'warning' },
            { label: 'Citations', value: 3, tone: 'error', hint: 'unter Ziel' },
            { label: 'Coverage', value: '78%', tone: 'info' },
          ]}
        />
      </ChatBlockPanel>

      <ChatBlockPanel title="Details" eyebrow="details">
        <ChatKeyValueList
          items={[
            { label: 'Projekt', value: 'Demo Website' },
            { label: 'Domain', value: 'example.com' },
            { label: 'Status', value: 'Aktiv' },
          ]}
        />
      </ChatBlockPanel>

      <ChatBlockPanel title="Workflow" eyebrow="steps">
        <ChatStepList
          steps={[
            { id: 's1', label: 'Research', status: 'done' },
            { id: 's2', label: 'Personas', status: 'running', progress: 60, detail: 'AUDION' },
            { id: 's3', label: 'Journey', status: 'pending' },
          ]}
        />
      </ChatBlockPanel>

      <ChatBlockPanel title="GEO-Empfehlungen" eyebrow="actions">
        <ChatBlockList
          items={[
            {
              title: 'FAQ-Block für Top-Prompts',
              description: 'Deckt die häufigsten GEO-Fragen mit klaren Antworten ab.',
              badge: 'P1',
              tone: 'error',
            },
            {
              title: 'Schema.org HowTo für Kernservices',
              description: 'Strukturierte Daten erhöhen die Zitierbarkeit.',
              badge: 'P3',
              tone: 'info',
            },
          ]}
        />
      </ChatBlockPanel>

      <div
        className="chat-panel chat-panel-compact"
        style={{ minHeight: '12rem', border: '1px solid var(--line)', padding: '0.75rem' }}
      >
        <div className="chat-turns">
          <div className="chat-turn chat-turn-user">
            <span className="chat-role">Du</span>
            <p className="chat-text">Was sind die wichtigsten GEO-Findings?</p>
          </div>
          <div className="chat-turn chat-turn-assistant">
            <span className="chat-role">Assistent</span>
            <div className="chat-answer">
              <ChatBlockPanel title="Kurzfassung" eyebrow="summary">
                <Text role="meta" as="p" style={{ margin: 0 }}>
                  Score 62/100 — Fokus auf Citations und FAQ-Struktur.
                </Text>
              </ChatBlockPanel>
            </div>
          </div>
        </div>
        <form
          className="chat-form"
          onSubmit={(e) => e.preventDefault()}
          style={{ marginTop: '0.75rem' }}
        >
          <Textarea className="chat-composer" size="md" block placeholder="Nachricht…" rows={2} />
          <Button type="submit" variant="ghost" size="sm" className="chat-send">
            Senden
          </Button>
        </form>
      </div>
    </div>
  ),
}

export const InOverlay: Story = {
  args: {
    title: 'Assistant',
    eyebrow: 'overlay',
    children: null,
  },
  parameters: { layout: 'fullscreen' },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div style={{ minHeight: '100vh', padding: '1.5rem' }}>
        <Button type="button" onClick={() => setOpen(true)}>
          Open catalog overlay
        </Button>
        <ChatOverlay open={open} onOpenChange={setOpen} title="Assistant" placement="dock-end">
          <div
            className="chat-panel chat-panel-compact"
            style={{ padding: '0.75rem', overflow: 'auto' }}
          >
            <div className="chat-turns" style={{ display: 'grid', gap: '1rem' }}>
              <div className="chat-turn chat-turn-assistant">
                <span className="chat-role">Assistent</span>
                <div className="chat-answer" style={{ display: 'grid', gap: '0.85rem' }}>
                  <ChatBlockPanel title="GEO Kennzahlen" eyebrow="metrics">
                    <ChatMetricGrid
                      items={[
                        { label: 'GEO Score', value: 62, unit: '/100', tone: 'warning' },
                        { label: 'Citations', value: 3, tone: 'error' },
                      ]}
                    />
                  </ChatBlockPanel>
                  <ChatBlockPanel title="Workflow" eyebrow="steps">
                    <ChatStepList
                      steps={[
                        { id: 'a', label: 'Crawl', status: 'done' },
                        { id: 'b', label: 'Score', status: 'running', progress: 40 },
                      ]}
                    />
                  </ChatBlockPanel>
                  <ChatBlockPanel title="Erkenntnisse" eyebrow="findings">
                    <ChatBlockList
                      items={[
                        {
                          title: 'GEO Gesamt-Score steigern (aktuell 62/100)',
                          description:
                            'Der Score liegt deutlich unter dem Wettbewerbs-Schnitt.',
                          badge: 'Warnung',
                          tone: 'warning',
                        },
                      ]}
                    />
                  </ChatBlockPanel>
                </div>
              </div>
            </div>
          </div>
        </ChatOverlay>
      </div>
    )
  },
}
