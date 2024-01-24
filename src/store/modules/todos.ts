import { notify } from '@kyvg/vue3-notification'
import TodosService from '../../services/TodosService.ts'
import { TodosState, Todo } from '../types';

export default {
    state: {
        todos: [],
    } as TodosState,
    mutations: {
        setTodos(state: TodosState, todos: Todo[]) {
            state.todos = todos
        },
    },
    actions: {
        async downloadTodos({ commit }) {
            commit('setLoading', true)
            try {
                const response = await TodosService.getTodos()
                commit('setTodos', response.data)
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'Download Todos',
                    text: err?.response?.data?.message || 'Something went wrong',
                })
            } finally {
                commit('setLoading', false)
            }
        },
    },
    getters: {
        getTodos(state: TodosState) {
            return state.todos
        },
    },
}
