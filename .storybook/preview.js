/** @type { import('@storybook/vue3-vite').Preview } */
import '../src/app.css'
import Library from '../src/main'
import { createMemoryHistory, createRouter } from 'vue-router'

// Create a simple mock router for Storybook
const routes = [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div>Page</div>' } },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const preview = {
    parameters: {
        controls: {
            expanded: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: { test: 'todo' },
    },

    // Proper hook to register the library globally in Storybook
    setup(app) {
        app.use(router)
        Library.install(app)
    },
}

export default preview
