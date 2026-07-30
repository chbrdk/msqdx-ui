import type { HTMLAttributes, ReactNode } from 'react'

export type WizardStep = {
  id: string
  label: ReactNode
}

export type WizardStepsProps = {
  steps: WizardStep[]
  activeIndex: number
  className?: string
  onStepSelect?: (index: number) => void
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children' | 'onSelect'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Compact horizontal step indicator for multi-step dialogs. */
export function WizardSteps({
  steps,
  activeIndex,
  className,
  onStepSelect,
  ...rest
}: WizardStepsProps) {
  return (
    <nav className={cx('ds-wizard-steps', className)} aria-label="Wizard steps" {...rest}>
      <ol className="ds-wizard-steps-list">
        {steps.map((step, index) => {
          const state =
            index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'todo'
          const interactive = typeof onStepSelect === 'function' && index <= activeIndex
          return (
            <li key={step.id} className="ds-wizard-step" data-state={state}>
              {interactive ? (
                <button
                  type="button"
                  className="ds-wizard-step-btn"
                  aria-current={state === 'active' ? 'step' : undefined}
                  onClick={() => onStepSelect(index)}
                >
                  <span className="ds-wizard-step-index" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="ds-wizard-step-label">{step.label}</span>
                </button>
              ) : (
                <span
                  className="ds-wizard-step-static"
                  aria-current={state === 'active' ? 'step' : undefined}
                >
                  <span className="ds-wizard-step-index" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="ds-wizard-step-label">{step.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
