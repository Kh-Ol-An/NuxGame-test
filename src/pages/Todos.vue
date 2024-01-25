<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '../store';
import Todo from '../components/Todo.vue';
import User from '../components/User.vue';
import DropDown from '../components/DropDown.vue';

interface StatusOption {
    value: string;
    label: string;
}

const { state } = useStore();

// Filter bu status
const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'uncompleted', label: 'Uncompleted' },
    { value: 'favorites', label: 'Favorites' },
];

const selectedStatusOption = ref<StatusOption | null>(null);

const sendStatusFilterRequest = () => {
    console.log('sendStatusFilterRequest:', selectedStatusOption.value);
};

watch(selectedStatusOption, () => {
    sendStatusFilterRequest();
});

// Filter bu user id
const userIdOptions = computed(() => {
    const initialUserIdOptions = [{ value: 'all-users', label: 'All Users' }];
    state.todos.todos.map((todo) => {
        if (!initialUserIdOptions.some((option) => option.value === todo.userId)) {
            initialUserIdOptions.push({
                value: todo.userId,
                label: todo.userId,
            });
        }
    });

    return initialUserIdOptions;
});

const selectedUserIdOption = ref<StatusOption | null>(null);

const sendUserIdFilterRequest = () => {
    console.log('Новий запит з опціями:', selectedUserIdOption.value);
};

watch(selectedUserIdOption, () => {
    sendUserIdFilterRequest();
});
</script>

<template>
    <div class="todos-root">
        <User/>

        <div class="filters">
            <DropDown
                :options="statusOptions"
                v-model:value="selectedStatusOption"
                label="Filter by status:"
            />

            <DropDown
                :options="userIdOptions"
                v-model:value="selectedUserIdOption"
                label="Filter by user id:"
            />
        </div>

        <ul class="todos">
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

.filters
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: space-around
    gap: 20px

.todos
    display: grid
    gap: 10px
    align-items: stretch

    @media (min-width: 768px)
        grid-template-columns: repeat(2, 1fr)

    @media (min-width: 1366px)
        grid-template-columns: repeat(3, 1fr)
</style>
