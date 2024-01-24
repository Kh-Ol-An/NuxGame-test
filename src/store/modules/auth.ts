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
        async login({ commit }, { username, phone }) {
            try {
                const response = await AuthService.login()
                const user = response.data.find((user: User) => user.username === username && user.phone === phone)
                if (user) {
                    commit('setUser', user)
                    localStorage.setItem('token', user)
                    await router.push('/')
                } else {
                    notify({
                        type: 'error',
                        title: 'LogIn',
                        text: 'User not found',
                    })
                }
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'LogIn',
                    text: err?.response?.data?.message || 'Something went wrong',
                })
            }
        },
        logout({ commit }) {
            commit('setUser', null)
            localStorage.removeItem('token')
            router.push('/auth')
        }
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
