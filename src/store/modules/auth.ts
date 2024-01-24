import { notify } from '@kyvg/vue3-notification'
import router from '../../router/index.ts'
import AuthService from '../../services/AuthService.ts'
import { AuthState, User } from '../types';

export default {
    state: {
        user: null,
        isLoading: false,
    } as AuthState,
    mutations: {
        setUser(state: AuthState, user: User) {
            state.user = user
        },
        setLoading(state: AuthState, bool: boolean) {
            state.isLoading = bool
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const response = await AuthService.login()
                localStorage.setItem('token', response.data)
                commit('setUser', response.data)
                await router.push('/')
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'LogIn',
                    text: err?.response?.data?.message || 'Something went wrong',
                })
            }
        },
    },
    getters: {
        getUser(state: AuthState) {
            return state.user
        },
        getLoading(state: AuthState) {
            return state.isLoading
        },
    },
}
