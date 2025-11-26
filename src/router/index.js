import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    // Routes will be defined by the consuming application
    // This is a default/example structure
];

export function createAppRouter(userRoutes = []) {
    return createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [...routes, ...userRoutes],
    });
}

export default createAppRouter;