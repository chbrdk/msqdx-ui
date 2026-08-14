import type { ReactNode } from 'react'
import { Text, View } from '@react-pdf/renderer'
import { magStyles } from './tokens'

export function MagChip({ children }: { children: ReactNode }) {
  return <Text style={magStyles.chip}>{children}</Text>
}

export function MagChipRow({ children }: { children: ReactNode }) {
  return <View style={magStyles.chipRow}>{children}</View>
}
