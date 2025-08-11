import { defineCustomElement } from "vue";
import RecruitmentOpenings from "./widgets/RecruitmentOpenings.vue";

const widgets = [
  { name: "recruitment-openings", component: RecruitmentOpenings },
  // Add more widgets here
];

widgets.forEach(({ name, component }) => {
  if (typeof customElements.get(name) === "undefined") {
    customElements.define(name, defineCustomElement(component));
  }
});

if (typeof window === "object") {
  window.LogezyWidgets = widgets.reduce((registry, { name, component }) => {
    registry[name] = component;
    return registry;
  }, {});
}

export {};
