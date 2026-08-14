import { View } from '@react-pdf/renderer'
import {
  MagPersonaCard,
  type MagPersonaCardLabels,
  type MagPersonaCardModel,
} from './MagPersonaCard'
import { magStyles } from './tokens'

type MagPersonaGridProps = {
  personas: MagPersonaCardModel[]
  labels?: Partial<MagPersonaCardLabels>
}

export function MagPersonaGrid({ personas, labels }: MagPersonaGridProps) {
  if (personas.length === 1) {
    return <MagPersonaCard persona={personas[0]!} spread labels={labels} />
  }

  const rows: MagPersonaCardModel[][] = []
  for (let i = 0; i < personas.length; i += 2) {
    rows.push(personas.slice(i, i + 2))
  }

  return (
    <View style={{ width: '100%' }}>
      {rows.map((pair, rowIndex) => (
        <View
          key={rowIndex}
          style={[magStyles.personaRow, rowIndex > 0 ? { marginTop: 22 } : undefined]}
        >
          {pair.map((persona, i) => (
            <View
              key={persona.id || persona.name}
              style={i === 0 ? magStyles.personaCell : magStyles.personaCellLast}
            >
              <MagPersonaCard persona={persona} bare labels={labels} />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
