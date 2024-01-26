<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '../store';
import User from '../components/User.vue';
import CreateTodo from '../components/CreateTodo.vue';
import DropDown from '../components/DropDown.vue';
import Input from '../components/Input.vue';
import Todo from '../components/Todo.vue';

const { state, dispatch } = useStore();

// Filter bu status
const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'uncompleted', label: 'Uncompleted' },
    { value: 'favorites', label: 'Favorites' },
];
const selectedStatusOption = ref<string | null>(null);

const statusFilterParams = ref<string>('');

// Filter bu user id
const userIdOptions = computed(() => {
    const initialUserIdOptions = [{ value: 'all-users', label: 'All Users' }];
    state.todos?.todos?.map((todo) => {
        if (!initialUserIdOptions.some((option) => option.value === todo.userId)) {
            initialUserIdOptions.push({
                value: todo.userId,
                label: todo.userId,
            });
        }
    });

    return initialUserIdOptions;
});

const selectedUserIdOption = ref<string | null>(null);

const userIdFilterParams = ref<string>('');

//filtering
const filtering = () => {
    let params = '?';
    if (statusFilterParams.value.length > 0) {
        params += (statusFilterParams.value + '&');
    }
    if (userIdFilterParams.value.length > 0) {
        params += (userIdFilterParams.value + '&');
    }

    dispatch('filterTodos', params.replace(/[\?&]+$/, ''));
};

watch([selectedStatusOption, selectedUserIdOption], () => {
    if (selectedStatusOption.value === 'all' || selectedStatusOption.value === 'favorites') {
        statusFilterParams.value = '';
    }

    if (selectedStatusOption.value === 'completed') {
        statusFilterParams.value = `completed=${true}`;
    }

    if (selectedStatusOption.value === 'uncompleted') {
        statusFilterParams.value = `completed=${false}`;
    }

    userIdFilterParams.value = `userId=${selectedUserIdOption.value}`;
    if (selectedUserIdOption.value === 'all-users' || !selectedUserIdOption.value) {
        userIdFilterParams.value = '';
    }

    filtering();
});

// Search
const search = ref<string>('');

const storedFavorites = ref<string[] | null>(JSON.parse(localStorage.getItem('favorites')));

const filteredTodos = computed(() => {
    let todos = state.todos?.todos;
    if (state.todos?.filteredTodos.length > 0) {
        todos = state.todos?.filteredTodos;
    }

    if (search.value.length > 0) {
        todos = todos?.filter((todo) => todo.title.toLowerCase().includes(search.value.toLowerCase()));
    }

    if (selectedStatusOption.value === 'favorites') {
        todos = todos?.filter((todo) => storedFavorites.value?.includes(todo.id));
    }

    return todos || [];
});
</script>

<template>
    <div class="todos-root">
        <User/>

        <CreateTodo />

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

            <!-- I set "new-password" for the id because: -->
            <!-- https://adamsilver.io/blog/stopping-chrome-from-ignoring-autocomplete-off/ -->
            <div class="search">
                <span class="label">Search:</span>
                <Input
                    id="new-password"
                    v-model:value="search"
                    type="text"
                    placeholder="Searching..."
                    withoutError
                />
            </div>
        </div>

        <ul class="todos">
            <li v-for="todo in filteredTodos" :key="todo.id">
                <Todo
                    :userId="todo.userId"
                    :id="todo.id"
                    :title="todo.title"
                    :completed="todo.completed"
                    v-model:favorites="storedFavorites"
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

.search
    display: flex
    align-items: center
    gap: 8px

.label
    @include label
    color: $white-color

.todos
    display: grid
    gap: 10px
    align-items: stretch

    @media (min-width: 768px)
        grid-template-columns: repeat(2, 1fr)

    @media (min-width: 1366px)
        grid-template-columns: repeat(3, 1fr)
</style>
