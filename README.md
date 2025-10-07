# Logezy Widgets

This project provides a collection of Vue 3 widgets bundled as standard Web Components (Custom Elements) for easy embedding into any HTML page. **Now with full Tailwind CSS integration in Shadow DOM using pure utility classes.**

---

## Features

- **Standard Web Components:** Widgets are compiled into custom elements, allowing them to be used with any framework or a plain HTML page.
- **Vue 3:** Built with the latest Vue 3 Composition API.
- **Tailwind CSS in Shadow DOM:** Complete Tailwind CSS integration with styles injected directly into the Shadow Root for perfect isolation.
- **Pure Utility Classes:** Uses only Tailwind utility classes, no custom component styles.
- **Zero CSS Leakage:** Styles are encapsulated within the Shadow DOM to prevent conflicts with the host page's CSS.
- **Single File Deployment:** The entire widget library is bundled into single JavaScript files for easy distribution and CDN hosting.
- **Production Optimized:** Tree-shaken, minified builds (~76KB minified, ~29KB gzipped).

---

## Tailwind CSS Integration

### How It Works

1. **CSS Injection:** Tailwind CSS is imported as an inline string using Vite's `?inline` suffix
2. **Shadow DOM Injection:** The CSS is injected into each widget's Shadow Root via Vue's `styles: [tailwindCss]` option
3. **Perfect Isolation:** Tailwind utilities work inside the widget but don't affect the host page
4. **No External Files:** All CSS is bundled into the JavaScript output - no separate `.css` files
5. **Pure Utilities:** Only Tailwind utility classes are used, no custom component styles

### Key Implementation Details

- **No Preflight:** Tailwind's base styles are disabled (`preflight: false`) to prevent conflicts
- **Pure Utilities:** All styling done with standard Tailwind utility classes
- **Shadow DOM Base:** Only `:host` styles are applied via `@layer base`
- **Tree Shaking:** Only used Tailwind utilities are included in the final bundle

### Extending the Theme

To customize Tailwind for your widgets, edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        custom: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

### Verifying No CSS Leakage

1. **Build Check:** Ensure `dist/` contains only `.js` files, no `.css` files
2. **Browser DevTools:** Inspect the widget element - styles should be in `#shadow-root`
3. **Host Page Test:** Add conflicting CSS classes to the host page - widget should be unaffected

---

## Development

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/logezy/logezy-widgets.git
    cd logezy-widgets
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the Vite development server with hot-reloading, run:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the widget with Tailwind CSS applied.

### Building for Production

To build the production-ready widget files, run:

```bash
npm run build
```

---

## Build Output

The `npm run build` command generates the following files in the `dist/` directory:

- `widgets.esm.js`: The ES Module (ESM) build (~119KB), for use in modern browsers that support `<script type="module">`.
- `widgets.min.js`: The minified Immediately Invoked Function Expression (IIFE) build (~76KB), for compatibility with older browsers using a standard `<script>` tag.

**No CSS files are generated** - all Tailwind styles are embedded in the JavaScript bundles.

---

## Usage

The following widget is available:

### `<recruitment-openings>`

This component displays a list of recruitment openings styled with pure Tailwind CSS utility classes.

**Attributes:**

- `api-url`: (Required) The base URL or endpoint of the API that provides the job openings data. This URL will be used by the widget to fetch and display the relevant openings.
- `tenant`: (Required) A unique identifier representing the tenant or client whose job openings are to be displayed. This allows the widget to filter and fetch openings specific to the designated tenant.

**Example:**

To use the widget, include one of the following script tags in your HTML file, then add the custom element to your page.

#### ESM (Modern Browsers)

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/logezy/logezy-widgets@build/widgets.esm.js"
></script>

<recruitment-openings issuer-url="issuer url" api-url="base url" tenant-slug="tenant_slug">
  <div>
    Your browser doesn't support embedded opening widgets. Visit
    <a href="https://logezy.com">our careers</a>.
  </div>
</recruitment-openings>
```

#### IIFE (Legacy Browsers)

```html
<script src="https://cdn.jsdelivr.net/gh/logezy/logezy-widgets@build/widgets.min.js"></script>

<recruitment-openings issuer-url="issuer url" api-url="base url" tenant-slug="tenant_slug">
  <div>
    Your browser doesn't support embedded opening widgets. Visit
    <a href="https://logezy.com">our careers</a>.
  </div>
</recruitment-openings>
```

---

## Technical Architecture

### File Structure

```
src/
├── main.ts              # Entry point with Tailwind injection
├── styles/
│   └── tailwind.css     # Tailwind directives (base only)
├── widgets/
│   └── RecruitmentOpenings.vue  # Widget using pure Tailwind utilities
└── ...

tailwind.config.js       # Tailwind configuration
postcss.config.js        # PostCSS configuration
vite.config.js          # Vite build configuration
```

### Shadow DOM Integration

```typescript
// main.ts - How Tailwind is injected
import tailwindCss from './styles/tailwind.css?inline'

const customElement = defineCustomElement({
  ...component,
  styles: [tailwindCss]  // Injects CSS into Shadow Root
})
```

### Pure Utility Classes

The widget uses only standard Tailwind utility classes:

```vue
<template>
  <div class="rounded-lg shadow-sm p-3 bg-white border border-gray-50 max-w-sm">
    <header class="flex items-baseline justify-between mb-2">
      <h3 class="text-base font-semibold m-0">Openings</h3>
      <small class="text-gray-500 text-xs">Tenant: <strong>{{ tenant }}</strong></small>
    </header>
    <!-- More utility classes... -->
  </div>
</template>
```

---

## Deployment

The production-ready files in the `dist/` directory are intended to be deployed to a CDN. The examples above use jsDelivr to serve the files from a `build` branch of the GitHub repository.

To update the CDN, the new files from the `dist/` directory must be pushed to the `build` branch.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
