import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Todos',
        component: () => import('../pages/Todos.vue'),
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../pages/Auth.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
