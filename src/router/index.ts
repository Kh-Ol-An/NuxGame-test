import { createRouter, createWebHashHistory } from 'vue-router'

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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
