import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import {
  Check,
  CircleHelp,
  FolderKanban,
  History,
  LayoutDashboard,
  LayoutGrid,
  Map,
  Mic,
  Pencil,
  Search,
  Send,
  Share2,
  Trash2,
  Users,
  Video,
  X,
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
export const IconShare = wrap(Share2)
export const IconHistory = wrap(History)
export const IconMoodboard = wrap(LayoutGrid)
export const IconMic = wrap(Mic)
export const IconVideo = wrap(Video)
export const IconInfo = wrap(CircleHelp)
export const IconEdit = wrap(Pencil)
export const IconTrash = wrap(Trash2)
export const IconCheck = wrap(Check)
export const IconClose = wrap(X)
