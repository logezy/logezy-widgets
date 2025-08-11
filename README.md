# Logezy Recruitment Openings Widget

Self-contained **Vue 3 Web Component** (`<logezy-recruitment-openings>`) embeddable on any website via **CDN**.  
Supports both modern `<script type="module">` and legacy `<script src="...">` usage.

---

## Features

- **Vue 3 Composition API** + Shadow DOM styling.
- Accepts `tenant` attribute to fetch openings from your API.
- Zero dependencies for host site — Vue bundled in.
- Works as a native Custom Element (`defineCustomElement`).
- Two build formats:
  - **ESM** for modern browsers
  - **IIFE** for non-module script tags

---

## Development Setup

```bash
# clone repo
git clone https://github.com/<you>/logezy-widget.git
cd logezy-widget

# install deps
npm install

# start local dev server
npm run dev

# build production bundles (ESM + IIFE)
npm run build
```
