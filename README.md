# Vue DnD Forms

A powerful and customizable form builder built with Vue 3, FormKit, FormKit DnD, Shadcn-Vue, and Tailwind CSS v4. This drag-and-drop form builder allows you to create complex forms with a user-friendly interface.

## 🚀 Features

- **Drag and Drop Interface**: Build forms by dragging and dropping components
- **Form Element Editing**: Configure properties, validations, and styling for each form element
- **Live Preview**: See your form changes in real-time
- **Theme Customization**: Customize the appearance with Tailwind CSS and FormKit theming
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Built-in light and dark mode themes
- **Type-Safe**: Built with TypeScript for a better developer experience

## 📦 Installation

You can quickly add this form builder to your Vue 3 project using the following npx command:

```bash
npx degit https://github.com/yourusername/vue-dnd-forms/lib/form-builder components/form-builder
```

This will copy the form builder code into a `components/form-builder` directory in your project, allowing you to fully customize it as needed.

## 🛠️ Setup Requirements

### Prerequisites

- Node.js (v16 or later)
- Vue 3 project with Vite

### 1. Install Dependencies

```bash
npm install @formkit/vue @formkit/addons @formkit/drag-and-drop tailwindcss@latest @tailwindcss/vite class-variance-authority clsx tailwind-merge lucide-vue-next
```

### 2. FormKit Setup

Add FormKit to your Vue application in your `main.ts` file:

```typescript
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import config from './formkit.config'

createApp(App)
  .use(plugin, defaultConfig(config))
  .mount('#app')
```

Create a `formkit.config.ts` file:

```typescript
// formkit.config.ts
import { rootClasses } from './formkit.theme'
import { defaultConfig } from '@formkit/vue'

export default defaultConfig({
  config: {
    rootClasses,
  }
})
```

### 3. FormKit DnD Setup

The FormKit Drag and Drop functionality is used in the form builder components. No additional setup is required beyond installing the dependency.

### 4. Shadcn-Vue Setup

The form builder uses Shadcn-Vue components. These components are included in the `lib/ui` directory when you install the form builder.

### 5. Tailwind CSS v4 Setup

Configure Tailwind CSS in your project:

```bash
npm install tailwindcss@latest @tailwindcss/vite postcss autoprefixer
```

Create or update your `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    'formkit.theme.ts',
    './components/**/*.{vue,js,ts}',
    './src/**/*.{vue,js,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🎨 Theming

### FormKit Theming

The form builder uses FormKit's theming system through the `formkit.theme.ts` file. This file defines the styling for all FormKit components using Tailwind CSS classes.

You can customize the theme by modifying the variables in the `formkit.theme.ts` file:

```typescript
/**
 * @variables - radius=rounded-xl,accentColor=green,colorTemperature=stone,spacing=1.5,scale=sm,inputShadow=shadow-md,baseColorShade=600,borderShadeLightMode=400,borderShadeDarkMode=800,inputMaxWidth=max-w-[24em],tagRadius=rounded,swatchRadius=rounded
 * @theme - regenesis
 **/
```

### Shadcn Theme

The Shadcn theme is defined in the `style.css` file using CSS variables. Here's an excerpt:

```css
:root {
  --background: oklch(1 0 0);
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
  --accent: oklch(0.97 0.001 106.424);
  --accent-foreground: oklch(0.216 0.006 56.043);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.923 0.003 48.717);
  --input: oklch(0.923 0.003 48.717);
  --ring: oklch(0.709 0.01 56.259);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
  --card: oklch(0.147 0.004 49.25);
  --card-foreground: oklch(0.985 0.001 106.423);
  --popover: oklch(0.147 0.004 49.25);
  --popover-foreground: oklch(0.985 0.001 106.423);
  --primary: oklch(0.985 0.001 106.423);
  --primary-foreground: oklch(0.216 0.006 56.043);
  --secondary: oklch(0.268 0.007 34.298);
  --secondary-foreground: oklch(0.985 0.001 106.423);
  --muted: oklch(0.268 0.007 34.298);
  --muted-foreground: oklch(0.709 0.01 56.259);
  --accent: oklch(0.268 0.007 34.298);
  --accent-foreground: oklch(0.985 0.001 106.423);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.268 0.007 34.298);
  --input: oklch(0.268 0.007 34.298);
  --ring: oklch(0.553 0.013 58.071);
}
```

## 🚀 Usage

After installing the form builder, you can use it in your Vue components:

```vue
<script setup lang="ts">
import BuilderMain from "../components/form-builder/builder/BuilderMain.vue";
</script>

<template>
  <BuilderMain />
</template>
```

The form builder consists of three main areas:
1. **Left Sidebar**: Contains form elements that can be dragged into the form
2. **Main Area**: The form building area where elements are arranged
3. **Right Sidebar**: Properties panel for configuring the selected form element

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License—see the LICENSE file for details.
