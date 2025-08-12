import { defineCustomElement, type Component, type ComponentOptions } from 'vue'
import RecruitmentOpenings from './widgets/RecruitmentOpenings.vue'

interface Widget {
  name: string;
  component: ComponentOptions;
}

const widgets: Widget[] = [
  { name: 'recruitment-openings', component: RecruitmentOpenings as ComponentOptions },
  // Add more widgets here
]

widgets.forEach(({ name, component }) => {
  if (typeof customElements.get(name) === 'undefined') {
    customElements.define(name, defineCustomElement(component))
  }
})

declare global {
  interface Window {
    LogezyWidgets: Record<string, Component>;
  }
}

if (typeof window === 'object') {
  window.LogezyWidgets = widgets.reduce(
    (registry: Record<string, Component>, { name, component }) => {
      registry[name] = component as Component
      return registry
    },
    {}
  )
}

export {}
