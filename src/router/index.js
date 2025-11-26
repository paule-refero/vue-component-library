import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

const routes = [
    // Routes will be defined by the consuming application
    // This is a default/example structure
];

export function createAppRouter(userRoutes = [], options = {}) {
    const { isStorybook = false } = options;

    return createRouter({
        history: isStorybook ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
        routes: [...routes, ...userRoutes],
    });
}

export default createAppRouter;