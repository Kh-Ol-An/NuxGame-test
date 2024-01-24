<script setup lang="ts">
import Todo from '../components/Todo.vue';
import User from '../components/User.vue';
</script>

<template>
    <div class="todos-root">
        <User/>

        <Todo/>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.todos-root
    padding: 20px
    display: flex
    align-items: center
    flex-direction: column
    gap: 20px
</style>
