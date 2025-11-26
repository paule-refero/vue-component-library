/** @type { import('@storybook/vue3-vite').Preview } */
import '../src/app.css'
import Library, { createAppRouter } from '../src/main'

// Create a simple mock router for Storybook
const routes = [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/home', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
    { path: '/products', component: { template: '<div>Products</div>' } },
    { path: '/products/electronics', component: { template: '<div>Electronics</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } },
    { path: '/terms', component: { template: '<div>Terms</div>' } },
    { path: '/privacy', component: { template: '<div>Privacy</div>' } },
    { path: '/download', component: { template: '<div>Download</div>' } },
    { path: '/external', component: { template: '<div>External</div>' } },
    { path: '/user/:id', name: 'UserProfile', component: { template: '<div>Profile</div>' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div>Page</div>' } },
]

export const router = createAppRouter(routes, { isStorybook: true })

export const setup = (app) => {
    app.use(Library, { router })
}

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
    setup,

    decorators: [
        (story, { context }) => {
            return {
                components: { story },
                beforeCreate() {
                    // Ensure router is installed on the app instance
                    if (this.$.appContext && this.$.appContext.app && !this.$.appContext.app._router) {
                        this.$.appContext.app.use(router);
                        this.$.appContext.app._router = router;
                    }
                },
                template: '<story />',
            };
        },
    ],
}

export default preview
