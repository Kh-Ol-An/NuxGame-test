<script setup lang="ts">
import { onMounted } from 'vue';
import { notify } from "@kyvg/vue3-notification";
import { useStore } from './store';
import router from './router/index.ts';
import Loading from './components/Loading.vue';

const { dispatch, state } = useStore();

onMounted(() => {
    dispatch('checkAuth');
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Auth' && !localStorage.getItem('token')) {
        next({
            path: 'auth',
            replace: true,
        });
        notify({
            type: 'warn',
            title: 'Authorization',
            text: 'This page is open only to authorized users. Please log in.'
        });
    }

    if (to.name === 'Auth' && localStorage.getItem('token')) {
        next({
            path: '/',
            replace: true,
        });
        notify({
            type: 'warn',
            title: 'Authorization',
            text: 'You are already logged in'
        });
    }

    next();
});
</script>

<template>
    <notifications/>

    <Loading v-if="state.auth.isLoading"/>
    <template v-else>
        <router-view></router-view>
    </template>
</template>
