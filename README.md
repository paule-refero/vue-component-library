## Project Overview:

Vue 3 component library for use in new applications

- Vue 3 components in src/components/
- Storybook for component documentation (port 6006)
- Playwright for e2e testing
- Vitest for testing
- Tailwind CSS v4 for styling
- FontAwesome icons
- Vue Router integration
- ESLint for code quality

### Installation

```bash
npm install vue3-component-library
```

### Usage

#### Basic Installation (Components Only)

```javascript
import { createApp } from 'vue';
import Library from 'vue3-component-library';
import App from './App.vue';

const app = createApp(App);
app.use(Library);
app.mount('#app');
```

#### Installation with Vue Router

You can integrate Vue Router in two ways:

**Option 1: Pass router during library installation**

```javascript
import { createApp } from 'vue';
import Library, { createAppRouter } from 'vue3-component-library';
import App from './App.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

const app = createApp(App);

// Create router with your custom routes
const router = createAppRouter([
  { path: '/', component: Home },
  { path: '/about', component: About }
]);

// Install library with router
app.use(Library, { router });
app.mount('#app');
```

**Option 2: Install router separately**

```javascript
import { createApp } from 'vue';
import Library, { createAppRouter } from 'vue3-component-library';
import App from './App.vue';

const app = createApp(App);
const router = createAppRouter(/* your routes */);

app.use(Library);
app.use(router);
app.mount('#app');
```

#### Individual Component Imports (Tree-shaking)

```javascript
import { BaseButton, BaseInput, createAppRouter } from 'vue3-component-library';
```

### Available Components:
- BaseButton, 
- BaseBadge, 
- BaseCard, 
- BaseDropdown
- BaseInput, 
- BasePasswordField, 
- BaseTextarea, 
- BaseFormField
- BaseSelect, 
- BaseLink
- SlideDownUp (Transition)

### Available Scripts:
- npm run storybook - Start Storybook dev server
- npm run dev - Start Vite dev server
- npm run build - Build the library
- npm run test - Run tests
- npm run test:ui - Interactive test UI
- npm run test:clean
- npm run lint - Fix linting issues
