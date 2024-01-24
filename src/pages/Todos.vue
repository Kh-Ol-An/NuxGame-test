<script setup lang="ts">
import { useStore } from '../store';
import Todo from '../components/Todo.vue'

const { dispatch } = useStore();
</script>

<template>
    <div>
        <button class="logout" type="button" @click="dispatch('logout')">logout</button>
        <Todo/>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.logout
    @include action
</style>