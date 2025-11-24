/** @type { import('@storybook/vue3-vite').Preview } */
import '../src/app.css'
import Library from '../src/main'

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
        Library.install(app)
    },
}

export default preview
