import { defineCustomElement, type Component, type ComponentOptions } from 'vue'
import RecruitmentOpenings from './widgets/RecruitmentOpenings.vue'
import tailwindCss from './styles/tailwind.css?inline'

interface Widget {
  name: string;
  component: ComponentOptions;
}

export const widgets: readonly Widget[] = [
  { name: 'recruitment-openings', component: RecruitmentOpenings as ComponentOptions },
  // Add more widgets here
] as const

const registerWidgets = (list: ReadonlyArray<Widget>, styleText: string): void => {
  list.forEach(({ name, component }) => {
    if (customElements.get(name) === undefined) {
      const element = defineCustomElement({
        ...(component as unknown as Component),
        styles: [styleText],
      })
      
      customElements.define(name, element)
    }
  })
}

registerWidgets(widgets, tailwindCss)

declare global {
  interface Window {
    LogezyWidgets: Readonly<Record<string, Component>>;
  }
}

if (typeof window === 'object') {
  const registry: Record<string, Component> = {}

  widgets.forEach(({ name, component }) => {
    registry[name] = component as unknown as Component
  })

  window.LogezyWidgets = Object.freeze(registry)
}

export {}
