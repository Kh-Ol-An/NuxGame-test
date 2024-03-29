import { notify } from '@kyvg/vue3-notification';
import router from '../../router/index.ts';
import AuthService from '../../services/AuthService.ts';
import { AuthState, User } from '../types';

export default {
    state: {
        user: null,
        isLoading: false,
    } as AuthState,
    mutations: {
        setUser(state: AuthState, user: User) {
            state.user = user;
        },
        setLoading(state: AuthState, bool: boolean) {
            state.isLoading = bool;
        },
    },
    actions: {
        async login({ commit, dispatch }, { username, phone }) {
            commit('setLoading', true);
            try {
                const response = await AuthService.login();
                const user = response.data.find((user: User) => user.username === username && user.phone === phone);
                if (user) {
                    await dispatch('downloadTodos');
                    commit('setUser', user);
                    localStorage.setItem('token', user.id);
                    await router.push('/');
                } else {
                    notify({
                        type: 'error',
                        title: 'LogIn',
                        text: 'User not found',
                    });
                }
            } catch (err) {
                notify({
                    type: 'error',
                    title: 'LogIn',
                    text: err?.response?.data?.message || 'Something went wrong',
                });
            } finally {
                commit('setLoading', false);
            }
        },
        logout({ commit }) {
            commit('setUser', null);
            localStorage.removeItem('token');
            localStorage.removeItem('favorites');
            router.push('/auth');
        },
        async checkAuth({ commit, dispatch }) {
            commit('setLoading', true);
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const response = await AuthService.login();
                const user = response.data.find((user: User) => user.id === Number(token));
                if (user) {
                    await dispatch('downloadTodos');
                    commit('setUser', user);
                    await router.push('/');
                } else {
                    notify({
                        type: 'error',
                        title: 'LogIn',
                        text: 'User not found',
                    });
                }
            } catch (err) {
                localStorage.removeItem('token');
                await router.push('/auth');
                notify({
                    type: 'error',
                    title: 'Authorization',
                    text: err?.response?.data?.message || 'Something went wrong',
                });
            } finally {
                commit('setLoading', false);
            }
        },
    },
};
