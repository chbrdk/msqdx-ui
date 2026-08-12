import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  PrintPage,
  PrintPersonaGrid,
  PrintPullQuote,
  PrintRankedList,
  PrintTwoColumn,
} from './PrintPrimitives'

describe('PrintPrimitives magazine twins', () => {
  it('renders folio, pull quote, two-column ranked list, and persona grid', () => {
    render(
      <PrintPage folioTitle="beispiel.de" folioPage="2 — 5">
        <PrintPullQuote label="Fazit" body="GEO ausbaufähig." />
        <PrintTwoColumn
          left={<p className="msqdx-print-body">Links</p>}
          right={
            <PrintRankedList
              columns={2}
              items={[
                { label: 'Alpha Finding mit etwas längerem Text' },
                { label: 'Beta' },
                { label: 'Gamma' },
                { label: 'Delta' },
              ]}
            />
          }
        />
        <PrintPersonaGrid
          personas={[
            {
              name: 'Anna Planer',
              segment: 'B2B',
              confidence: 0.8,
              goals: ['Lieferklarheit'],
            },
            {
              name: 'Jonas Sucher',
              confidence: 0.7,
            },
          ]}
        />
      </PrintPage>,
    )

    expect(screen.getByText('beispiel.de')).toBeTruthy()
    expect(screen.getByText('2 — 5')).toBeTruthy()
    expect(screen.getByText('GEO ausbaufähig.')).toBeTruthy()
    expect(screen.getByText('Anna Planer')).toBeTruthy()
    expect(screen.getByText('Jonas Sucher')).toBeTruthy()
    expect(screen.getByText('Alpha Finding mit etwas längerem Text')).toBeTruthy()
  })
})
