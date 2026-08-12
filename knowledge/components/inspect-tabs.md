# InspectTabs

Molecule: dense Design | CSS tablist for the inspect rail. Labels are props; panels stay in the app.

## Consumer mapping (creation-v3)

```ts
import { InspectTabs, PropertyInspector, InspectSection } from '@msqdx/ui'

const [tab, setTab] = useState('design')

<>
  <InspectTabs
    value={tab}
    onChange={setTab}
    designLabel={t('editor.inspect.design')}
    cssLabel={t('editor.inspect.css')}
  />
  {tab === 'design' ? (
    <PropertyInspector>
      <InspectSection title="Layout">…</InspectSection>
    </PropertyInspector>
  ) : (
    <CssPreview source={cssForSelection} />
  )}
</>
```

Do **not** put tabs on `PropertyInspector` — compose `InspectTabs` above/around it.

## Spec

`specs/domain/msqdx-ui-inspect-tabs.md`
