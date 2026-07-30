import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function slugify(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

export function normalizeLayer(layer) {
  const value = String(layer || '').toLowerCase()
  if (!['atoms', 'molecules', 'organisms'].includes(value)) {
    throw new Error(`Unsupported layer "${layer}". Use atoms, molecules, or organisms.`)
  }
  return value
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
}

function writeNewFile(path, content) {
  if (existsSync(path)) {
    throw new Error(`Refusing to overwrite existing file: ${path}`)
  }
  writeFileSync(path, content)
}

function insertBeforeLast(text, needle, block) {
  const idx = text.lastIndexOf(needle)
  if (idx < 0) throw new Error(`Needle not found: ${needle}`)
  return `${text.slice(0, idx)}${block}${text.slice(idx)}`
}

function appendIfMissing(path, block, match) {
  const prev = readFileSync(path, 'utf8')
  if (prev.includes(match)) return
  writeFileSync(path, `${prev.trimEnd()}\n${block}`)
}

function componentTemplate(name) {
  const kebab = slugify(name)
  return `import type { HTMLAttributes, ReactNode } from 'react'\n\nexport type ${name}Props = {\n  children?: ReactNode\n  className?: string\n} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>\n\nfunction cx(...parts: Array<string | false | null | undefined>): string {\n  return parts.filter(Boolean).join(' ')\n}\n\n/** Shared primitive scaffold — refine per spec before app use. */\nexport function ${name}({ children, className, ...rest }: ${name}Props) {\n  return (\n    <div className={cx('ds-${kebab}', className)} {...rest}>\n      {children}\n    </div>\n  )\n}\n`
}

function storyTemplate(name, layer) {
  const title = `${capitalize(layer)}/${name}`
  return `import type { Meta, StoryObj } from '@storybook/react-vite'\nimport { ${name} } from './${name}'\n\nconst meta = {\n  title: '${title}',\n  component: ${name},\n  args: {\n    children: '${name}',\n  },\n} satisfies Meta<typeof ${name}>\n\nexport default meta\ntype Story = StoryObj<typeof meta>\n\nexport const Default: Story = {}\n`
}

function mdxTemplate(name, layer) {
  return `# ${name}\n\nLayer: \`${layer}\`\n\nScaffolded via \`pnpm ds:add ${name} --layer ${layer}\`.\n\n## Next steps\n\n- Align API with \`specs/domain/msqdx-ui-${slugify(name)}.md\`\n- Replace the scaffold markup with the final primitive implementation\n- Add meaningful stories and assertions\n`
}

function testTemplate(name) {
  return `import { render, screen } from '@testing-library/react'\nimport { describe, expect, it } from 'vitest'\nimport { ${name} } from './${name}'\n\ndescribe('${name}', () => {\n  it('renders children', () => {\n    render(<${name}>${name}</${name}>)\n    expect(screen.getByText('${name}')).toBeInTheDocument()\n  })\n})\n`
}

function specTemplate(name, layer) {
  return `# MSQDX UI — ${name}\n\n**Status:** Draft  \n**Layer:** ${capitalize(layer)}\n\n## Purpose\n\nDescribe the shared problem solved by \`${name}\`.\n\n## API\n\n- Props:\n- States:\n- Accessibility:\n- Token dependencies:\n\n## Acceptance\n\n1. Storybook stories cover the intended states.\n2. Unit tests cover the key behavior.\n3. Consuming apps import \`${name}\` from \`@msqdx/ui\`.\n`
}

function knowledgeTemplate(name, layer) {
  return `# ${name}\n\nScaffolded as a ${layer} primitive in \`msqdx-ui\`.\n\n## Follow-up\n\n- Capture usage examples once the primitive ships in a consuming app.\n- Note migrations or API decisions here.\n`
}

function cssBlock(name) {
  const kebab = slugify(name)
  return `\n/* ${name} scaffold */\n.ds-${kebab} {\n}\n`
}

function catalogEntry(name, layer) {
  const title = `${capitalize(layer)}/${name}`
  return `  { id: '${name}', layer: '${capitalize(layer)}', title: '${title}', stories: 'components/${name}.stories.tsx', mdx: 'components/${name}.mdx' },\n`
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function scaffoldComponent(rootDir, name, layer) {
  const root = rootDir
  const cleanLayer = normalizeLayer(layer)
  const slug = slugify(name)
  const componentDir = join(root, 'packages', 'ui', 'src', 'components')
  const cssPath = join(root, 'packages', 'ui', 'src', 'css', 'components.css')
  const indexPath = join(root, 'packages', 'ui', 'src', 'index.ts')
  const catalogPath = join(root, 'packages', 'ui', 'src', 'storybook', 'catalog.ts')
  const specPath = join(root, 'specs', 'domain', `msqdx-ui-${slug}.md`)
  const knowledgePath = join(root, 'knowledge', 'components', `${slug}.md`)

  ensureDir(componentDir)
  ensureDir(dirname(specPath))
  ensureDir(dirname(knowledgePath))

  writeNewFile(join(componentDir, `${name}.tsx`), componentTemplate(name))
  writeNewFile(join(componentDir, `${name}.stories.tsx`), storyTemplate(name, cleanLayer))
  writeNewFile(join(componentDir, `${name}.mdx`), mdxTemplate(name, cleanLayer))
  writeNewFile(join(componentDir, `${name}.test.tsx`), testTemplate(name))
  writeNewFile(specPath, specTemplate(name, cleanLayer))
  writeNewFile(knowledgePath, knowledgeTemplate(name, cleanLayer))

  appendIfMissing(cssPath, cssBlock(name), `.ds-${slug}`)

  const indexPrev = readFileSync(indexPath, 'utf8')
  if (!indexPrev.includes(`./components/${name}`)) {
    const block = `export { ${name} } from './components/${name}'\nexport type { ${name}Props } from './components/${name}'\n`
    writeFileSync(indexPath, insertBeforeLast(indexPrev, "export { CATALOG, VIEWPORT_CRITICAL } from './storybook/catalog'\n", block))
  }

  const catalogPrev = readFileSync(catalogPath, 'utf8')
  if (!catalogPrev.includes(`id: '${name}'`)) {
    writeFileSync(catalogPath, insertBeforeLast(catalogPrev, ']\n\nexport const VIEWPORT_CRITICAL', `${catalogEntry(name, cleanLayer)}`))
  }

  return {
    name,
    layer: cleanLayer,
    files: [
      join(componentDir, `${name}.tsx`),
      join(componentDir, `${name}.stories.tsx`),
      join(componentDir, `${name}.mdx`),
      join(componentDir, `${name}.test.tsx`),
      specPath,
      knowledgePath,
    ],
  }
}

function parseArgs(argv) {
  const args = argv.slice(2)
  const name = args.find((arg) => !arg.startsWith('--'))
  const layerFlagIndex = args.findIndex((arg) => arg === '--layer')
  const layer = layerFlagIndex >= 0 ? args[layerFlagIndex + 1] : undefined
  const rootFlagIndex = args.findIndex((arg) => arg === '--root')
  const root = rootFlagIndex >= 0 ? args[rootFlagIndex + 1] : join(__dirname, '..')
  if (!name || !layer) {
    throw new Error('Usage: pnpm ds:add <Name> --layer atoms|molecules|organisms')
  }
  return { name, layer, root }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { name, layer, root } = parseArgs(process.argv)
    const result = scaffoldComponent(root, name, layer)
    console.log(`Scaffolded ${result.name} (${result.layer})`)
    for (const file of result.files) console.log(`- ${file}`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}
