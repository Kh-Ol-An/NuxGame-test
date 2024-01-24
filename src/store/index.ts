import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import auth from './modules/auth.ts';
import todos from './modules/todos.ts';
import { RootState } from './types';

export const store = createStore<RootState>({
    modules: {
        auth,
        todos,
    },
});

export const key: InjectionKey<Store<RootState>> | symbol = Symbol();

export function useStore() {
    return baseUseStore(key as InjectionKey<Store<RootState>>);
}
