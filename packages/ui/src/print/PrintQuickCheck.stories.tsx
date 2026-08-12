import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  PrintChapter,
  PrintCover,
  PrintDonut,
  PrintLedger,
  PrintPage,
  PrintRankedList,
  PrintScoreRing,
} from './PrintPrimitives'

const meta = {
  title: 'Print/QuickCheck',
  component: PrintPage,
  tags: ['print', 'magazine'],
} satisfies Meta<typeof PrintPage>

export default meta
type Story = StoryObj<typeof meta>

/** Full Quick Check print template twin — chapter rhythm for design review. */
export const MagazineDeck: Story = {
  render: () => (
    <PrintPage>
      <PrintCover
        eyebrow="MSQDX · Quick Check"
        title="beispiel.de — Quick Check"
        url="https://beispiel.de"
        meta="Collection Demo · 12.08.2026"
        fazit="Domain tragfähig; GEO-Prompts zeigen Lücken bei Lieferversprechen."
        kpis={[
          { label: 'Domain', value: '57', ringPct: 57 },
          { label: 'GEO', value: '41', ringPct: 41 },
          { label: 'Seiten', value: '50' },
        ]}
      />

      <PrintChapter eyebrow="Domain-Scan" title="Domain & Barrierefreiheit" lede="beispiel.de">
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
          <PrintScoreRing value={57} label="Score" />
          <div>
            <div className="msqdx-print-kpi__value">50</div>
            <div className="msqdx-print-kpi__label">Seiten</div>
            <p className="msqdx-print-meta">Fehler 213 · Warnungen 0</p>
          </div>
        </div>
        <PrintRankedList
          items={[
            { label: 'Form without submit button', meta: '50×' },
            { label: 'Img with empty alt', meta: '49×' },
          ]}
        />
      </PrintChapter>

      <PrintChapter
        eyebrow="Verteilungen"
        title="Anteil am Corpus"
        lede="Donuts zeigen die Zusammensetzung."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <p className="msqdx-print-eyebrow">Lesbarkeit</p>
            <PrintDonut
              slices={[
                { id: 'standard', label: 'Standard', value: 22 },
                { id: 'complex', label: 'Komplex', value: 26 },
              ]}
              centerValue={10.2}
              centerLabel="Score"
            />
          </div>
          <div>
            <p className="msqdx-print-eyebrow">Eco-Noten</p>
            <PrintDonut
              slices={[
                { id: 'C', label: 'C', value: 26 },
                { id: 'F', label: 'F', value: 14 },
              ]}
              centerValue="C"
              centerLabel="Modus"
            />
          </div>
          <div>
            <p className="msqdx-print-eyebrow">Link-Mix</p>
            <PrintDonut
              slices={[
                { id: 'internal', label: 'Intern', value: 19689 },
                { id: 'external', label: 'Extern', value: 656 },
              ]}
              centerValue={0}
              centerLabel="defekt"
            />
          </div>
        </div>
      </PrintChapter>

      <PrintChapter eyebrow="E-E-A-T" title="E-E-A-T" lede="Schwächste Signale zuerst.">
        <PrintLedger
          items={[
            { label: 'Erfahrung', score: 34 },
            { label: 'Fachkompetenz', score: 58 },
            { label: 'Autorität', score: 71 },
            { label: 'Vertrauen', score: 82 },
          ]}
        />
      </PrintChapter>

      <PrintChapter eyebrow="GEO-Empfehlungen" title="GEO-Empfehlungen">
        <PrintRankedList
          items={[
            { label: 'FAQ-Schema ergänzen', meta: 'Strukturierte Antworten für LLMs.' },
            { label: 'Autorenboxen auf Ratgeberseiten' },
          ]}
        />
      </PrintChapter>
    </PrintPage>
  ),
}
