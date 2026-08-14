import type { ReactNode } from 'react'
import { Page, Text, View } from '@react-pdf/renderer'
import { magStyles } from './tokens'

type MagPageProps = {
  children: ReactNode
  footerTitle?: string
  /** App-injected logo (e.g. plexon MsqdxLogoPdf). */
  logo?: ReactNode
  showLogo?: boolean
}

export function MagPage({ children, footerTitle, logo, showLogo = false }: MagPageProps) {
  return (
    <Page size="A4" style={magStyles.page} wrap>
      <View style={magStyles.columnShell}>
        <View style={magStyles.column}>
          {showLogo && logo ? <View style={{ marginBottom: 36 }}>{logo}</View> : null}
          {children}
        </View>
      </View>
      <View style={magStyles.footer} fixed>
        <View style={magStyles.footerRule} />
        <View style={magStyles.footerRow}>
          <Text style={magStyles.footerMeta}>{footerTitle ?? 'Quick Check'}</Text>
          <Text
            style={magStyles.footerMeta}
            render={({ pageNumber, totalPages }) => `${pageNumber} — ${totalPages}`}
          />
        </View>
      </View>
    </Page>
  )
}
