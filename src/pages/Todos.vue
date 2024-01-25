<script setup lang="ts">
import { useStore } from '../store';
import Todo from '../components/Todo.vue';
import User from '../components/User.vue';

const { state } = useStore();

</script>

<template>
    <div class="todos-root">
        <User/>

        <ul class="list">
            <li v-for="todo in state.todos.todos" :key="todo.id">
                <Todo
                    :userId="todo.userId"
                    :id="todo.id"
                    :title="todo.title"
                    :completed="todo.completed"
                />
            </li>
        </ul>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.todos-root
    padding: 16px
    display: flex
    align-items: center
    flex-direction: column
    gap: 30px

    @media (min-width: 768px)
        padding: 20px

.list
    display: grid
    gap: 10px
    align-items: stretch

    @media (min-width: 768px)
        grid-template-columns: repeat(2, 1fr)

    @media (min-width: 1366px)
        grid-template-columns: repeat(3, 1fr)
</style>
