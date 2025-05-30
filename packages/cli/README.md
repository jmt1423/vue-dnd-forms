# Vue DnD Forms

A powerful and customizable form builder built with Vue 3, FormKit, FormKit DnD, Shadcn-Vue, and Tailwind CSS v4.
This drag-and-drop form builder allows you or your users to create complex forms with a user-friendly interface.

## 🚀 Features

- **Drag and Drop Interface**: Build forms by dragging and dropping components
- **Form Element Editing**: Configure properties, validations, and styling for each form element
- **Live Preview**: See your form changes in real-time
- **Theme Customization**: Customize the appearance with Tailwind CSS and FormKit theming
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Built-in light and dark mode themes
- **Type-Safe**: Built with TypeScript

## 📦 Installation and setup

> Note: This is not an NPM package, while the default form builder is somewhat opinionated, I have
> decided to use the npx cli and copy the files in your src/components directory.
> You now have full control over the source code and you may update and change this
> how you see fit.

## 🛠️ Setup Requirements

### Prerequisites

- Node.js (v16 or later)
- Vue 3 project with Vite

### Step 1:

You can quickly add this form builder to your Vue 3 project using the following npx command:

```bash
npx @vue-form-forge/cli@latest
```

This will copy the form builder code into a `components/form-builder` directory in your project and download
any required dependencies

### Step 2 - Setup tailwind and css variables:

```bash
npm install tailwindcss @tailwindcss/vite
```

**Add tailwind to your vite.config.ts file:**

```typescript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**Create a `tailwind.config.js` file:**

```javascript
// tailwind.config.js
module.exports = {
  content: ["formkit.theme.ts"],
  purge: [],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

**Update your `main.css` file (or whatever your default styles file is):**

> NOTE: the css file below contains the variables that are used to theme the ui elements.
> You do not have to include them, but I would recommend just changing them to whatever
> color palette your website follows.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
@config "../../tailwind.config.js";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-border-red: var(--border-red);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --background: oklch(0.99 0.02 145);
  --foreground: oklch(0.147 0.004 49.25);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.147 0.004 49.25);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.147 0.004 49.25);
  --primary: oklch(0.216 0.006 56.043);
  --primary-foreground: oklch(0.985 0.001 106.423);
  --secondary: oklch(0.97 0.001 106.424);
  --secondary-foreground: oklch(0.216 0.006 56.043);
  --muted: oklch(0.97 0.001 106.424);
  --muted-foreground: oklch(0.553 0.013 58.071);
  --accent: oklch(0.65 0.2 145);
  --accent-foreground: oklch(0.216 0.006 56.043);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.923 0.003 48.717);
  --border-red: oklch(0.5493 0.131 26.86);
  --input: oklch(0.923 0.003 48.717);
  --ring: oklch(72.3% 0.219 149.579);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.973 0.036 142.742);
  --sidebar-foreground: oklch(0.147 0.004 49.25);
  --sidebar-primary: oklch(0.216 0.006 56.043);
  --sidebar-primary-foreground: oklch(0.985 0.001 106.423);
  --sidebar-accent: oklch(0.9 0.05 145);
  --sidebar-accent-foreground: oklch(0.216 0.006 56.043);
  --sidebar-border: oklch(0.923 0.003 48.717);
  --sidebar-ring: oklch(0.709 0.01 56.259);
}

.dark {
  --background: oklch(0.35 0.008 145);
  --foreground: oklch(0.92 0.003 145);
  --card: oklch(0.32 0.006 145);
  --card-foreground: oklch(0.92 0.003 145);
  --popover: oklch(0.32 0.006 145);
  --popover-foreground: oklch(0.92 0.003 145);
  --primary: oklch(0.92 0.003 145);
  --primary-foreground: oklch(0.216 0.006 56.043);
  --border-red: oklch(0.5493 0.131 26.86);
  --secondary: oklch(0.4 0.01 145);
  --secondary-foreground: oklch(0.92 0.003 145);
  --muted: oklch(0.38 0.008 145);
  --muted-foreground: oklch(0.75 0.005 145);
  --accent: oklch(0.6 0.08 145);
  --accent-foreground: oklch(0.92 0.003 145);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.45 0.01 145);
  --input: oklch(0.45 0.01 145);
  --ring: oklch(72.3% 0.15 149.579);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.25 0.008 145);
  --sidebar-foreground: oklch(0.92 0.003 145);
  --sidebar-primary: oklch(0.7 0.05 145);
  --sidebar-primary-foreground: oklch(0.92 0.003 145);
  --sidebar-accent: oklch(0.5 0.01 145);
  --sidebar-accent-foreground: oklch(0.92 0.003 145);
  --sidebar-border: oklch(0.3 0.008 145);
  --sidebar-ring: oklch(0.6 0.05 145);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Step 3 - Formkit config and theme setup:

**Create a `formkit.config.ts` at the root of your application:**

```typescript
// formkit.config.ts
import { rootClasses } from "./formkit.theme.ts";
import { defaultConfig } from "@formkit/vue";

export default defaultConfig({
  config: {
    rootClasses,
  },
});
```

**Add the formkit config file to your `main.ts` application entry point**

```typescript
import { createApp } from "vue";
import "./style.css";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import config from "../formkit.config";

createApp(App).use(plugin, defaultConfig(config)).mount("#app");
```

**Add a `formkit.theme.ts` file at the root of your application**

> This file is very long but contains the styling for all elements that could be rendered
> by the formkit library. You can either copy and paste the file from the gist I created
> below, or setup your own theme at https://themes.formkit.com/

[Link to formkit.theme.ts file](https://github.com/jmt1423/vue-form-forge/blob/570e590ea06c90a542858f36b76f6944de2cdd4e/packages/app/formkit.theme.ts)

## 🚀 Usage

> The BuilderProvider.vue file is mainly for easy importing of api keys incase your are running a monorepo setup.
> 
> This example is for using an openai api key that allows a user to quickly build a form.
> 
> The instructions file for the model can be found in the `/form-builder/componenets/ai-prompt` directory.

```vue
<script setup lang="ts">
import {
  FormBuilder,
  BuilderProvider,
  type FormBuilderConfig,
} from "./components/form-builder/main";
import { computed } from "vue";

const formBuilderConfig = computed<FormBuilderConfig>(() => ({
  apiKey: import.meta.env.VITE_MY_OPEN_AI_KEY,
}));
</script>

<template>
  <BuilderProvider :config="formBuilderConfig">
    <FormBuilder />
  </BuilderProvider>
</template>
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License—see the LICENSE file for details.
