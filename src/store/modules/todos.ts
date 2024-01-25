import { notify } from '@kyvg/vue3-notification';
import TodosService from '../../services/TodosService.ts';
import { TodosState, Todo } from '../types';

export default {
    state: {
        todos: [],
        filteredTodos: [],
    } as TodosState,
    mutations: {
        setTodos(state: TodosState, todos: Todo[]) {
            state.todos = todos;
        },
        addTodo(state: TodosState, todo: Todo) {
            state.todos.push(todo);
        },
        setFilteredTodos(state: TodosState, todos: Todo[]) {
            state.filteredTodos = todos;
        },
    },
    actions: {
        async downloadTodos({ commit }) {
            commit('setLoading', true);
            try {
                const response = await TodosService.getTodos();
                commit('setTodos', response.data);
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'Download Todos',
                    text: err?.response?.data?.message || 'Something went wrong',
                });
            } finally {
                commit('setLoading', false);
            }
        },
        async filterTodos({ commit }, params) {
            commit('setLoading', true);
            try {
                const response = await TodosService.filterTodos(params);
                commit('setFilteredTodos', response.data);
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'Download Todos',
                    text: err?.response?.data?.message || 'Something went wrong',
                });
            } finally {
                commit('setLoading', false);
            }
        },
        async createTodo({ commit }, params) {
            commit('setLoading', true);
            try {
                const response = await TodosService.createTodo(params);
                commit('addTodo', response.data);
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'Add Todo',
                    text: err?.response?.data?.message || 'Todo not added',
                });
            } finally {
                commit('setLoading', false);
            }
        },
    },
};
