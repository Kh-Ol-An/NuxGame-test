<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import router from './router/index.ts'
import { notify } from "@kyvg/vue3-notification";

const error = ref<string | null>(null)

onErrorCaptured(() => {
    error.value = 'Oh-yo-yo!!! Something went wrong...'
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Auth' && !localStorage.getItem('token')) {
        next({
            path: 'auth',
            replace: true,
        })
        notify({
            type: 'warn',
            title: 'Authorization',
            text: 'This page is open only to authorized users. Please log in.'
        })
    }

    if (to.name === 'Auth' && localStorage.getItem('token')) {
        next({
            path: '/',
            replace: true,
        })
        notify({
            type: 'warn',
            title: 'Authorization',
            text: 'You are already logged in'
        })
    }

    next()
})
</script>

<template>
    <notifications/>

    <div v-if="error" class="flex h-screen w-full items-center justify-center">
        <span class="text-center text-2xl font-bold text-opposite">
            {{ error }}
        </span>
    </div>

    <Suspense>
        <template #default>
            <router-view></router-view>
        </template>
        <template #fallback>
            <h1>Loading...</h1>
        </template>
    </Suspense>
</template>

<style scoped lang="sass">
</style>
