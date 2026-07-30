import { msqdxBrand } from './brand'

/** ECHON panel role accents */
export const msqdxRoles = {
  foresight: msqdxBrand.orange,
  research: msqdxBrand.blue,
  waves: msqdxBrand.purple,
  signals: msqdxBrand.pinkOnLight,
  sources: msqdxBrand.green,
  ops: '#64748b',
  corpus: msqdxBrand.orange,
  pipeline: msqdxBrand.blue,
} as const

export const msqdxRolesDark = {
  ...msqdxRoles,
  ops: '#a3a3a3',
  signals: msqdxBrand.pink,
} as const
