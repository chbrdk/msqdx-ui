import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import {
  FolderKanban,
  LayoutDashboard,
  Map,
  Search,
  Send,
  Users,
} from 'lucide-react'

export type IconProps = LucideProps

const defaults: LucideProps = {
  size: 16,
  strokeWidth: 1.75,
  'aria-hidden': true,
}

function wrap(Icon: ComponentType<LucideProps>) {
  return function Wrapped(props: IconProps) {
    return (
      <Icon
        {...defaults}
        {...props}
        className={['ui-icon', props.className].filter(Boolean).join(' ')}
      />
    )
  }
}

export const IconOverview = wrap(LayoutDashboard)
export const IconPersonas = wrap(Users)
export const IconResearch = wrap(Search)
export const IconProjects = wrap(FolderKanban)
export const IconJourneys = wrap(Map)
export const IconSend = wrap(Send)
