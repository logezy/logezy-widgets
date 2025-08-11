# Logezy Widgets

This project provides a collection of Vue 3 widgets bundled as standard Web Components (Custom Elements) for easy embedding into any HTML page.

---

## Features

- **Standard Web Components:** Widgets are compiled into custom elements, allowing them to be used with any framework or a plain HTML page.
- **Vue 3:** Built with the latest Vue 3 Composition API.
- **Scoped Styles:** Styles are encapsulated within the Shadow DOM to prevent conflicts with the host page's CSS.
- **Single File Deployment:** The entire widget library is bundled into single JavaScript files for easy distribution and CDN hosting.

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

### Building for Production

To build the production-ready widget files, run:

```bash
npm run build
```

---

## Build Output

The `npm run build` command generates the following files in the `dist/` directory:

- `widgets.esm.js`: The ES Module (ESM) build, for use in modern browsers that support `<script type="module">`.
- `widgets.min.js`: The minified Immediately Invoked Function Expression (IIFE) build, for compatibility with older browsers using a standard `<script>` tag.

---

## Usage

The following widget is available:

### `<recruitment-openings>`

This component displays a list of recruitment openings.

**Attributes:**

- `tenant`: (Required) The identifier for the tenant whose job openings should be displayed.

**Example:**

To use the widget, include one of the following script tags in your HTML file, then add the custom element to your page.

#### ESM (Modern Browsers)

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/logezy/logezy-widgets@build/widgets.esm.js"
></script>

<recruitment-openings api-url="url" tenant="tenant_slug"></recruitment-openings>
```

#### IIFE (Legacy Browsers)

```html
<script src="https://cdn.jsdelivr.net/gh/logezy/logezy-widgets@build/widgets.min.js"></script>

<recruitment-openings api-url="url" tenant="tenant_slug">
  <div>
    Your browser doesn't support embedded opening widgets. Visit
    <a href="https://logezy.com">our careers</a>.
  </div>
</recruitment-openings>
```

---

## Deployment

The production-ready files in the `dist/` directory are intended to be deployed to a CDN. The examples above use jsDelivr to serve the files from a `build` branch of the GitHub repository.

To update the CDN, the new files from the `dist/` directory must be pushed to the `build` branch.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
