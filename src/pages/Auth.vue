<script setup lang="ts">
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useStore } from '../store';
import Input from '../components/Input.vue';
import Card from '../components/Card.vue';

const { dispatch } = useStore();

const username = ref('');
const phone = ref('');

const validateUsername = (value) => {
    const regex = /^[a-zA-Z._]+$/; // The task included only letters. But the data array also contains the following characters: "." and "_"
    return regex.test(value);
};

const validatePhone = (value) => {
    const regex = /^[0-9-+!@#$%^&*(),.?":{}|<>]+$/;
    return regex.test(value);
};

const rules = computed(() => ({
    username: {
        onlyLatinLetters: helpers.withMessage('Only Latin letters and dots are allowed', validateUsername)
    },
    phone: {
        onlySymbolsAndNumbers: helpers.withMessage('Only symbols and numbers are allowed', validatePhone)
    }
}));

const v = useVuelidate(rules, { username, phone });

const disabledLogin = computed(
    () => username.value.length === 0 || phone.value.length === 0 || v.value.$error
);

const handleLogin = () => {
    v.value.$touch();
    if (v.value.$error) return;
    dispatch('login', { username: username.value, phone: phone.value });
};
</script>

<template>
    <div class="root">
        <Card>
            <template v-slot:header>Log In</template>

            <form class="body" @submit.prevent="handleLogin">
                <span class="label">Please log in</span>
                <Input
                    classes="username"
                    id="username"
                    v-model:value="v.username.$model"
                    type="text"
                    placeholder="Username"
                    :errors="v.username.$errors"
                />
                <Input
                    classes="phone"
                    id="phone"
                    v-model:value="v.phone.$model"
                    type="number"
                    placeholder="Phone Number"
                    :errors="v.phone.$errors"
                />
                <button
                    :class="['login', disabledLogin && 'disabled-login']"
                    type="submit"
                    :disabled="disabledLogin"
                >
                    Log In
                </button>
            </form>
        </Card>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.root
    width: 100%
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

.body
    padding: 14px 24px 30px
    display: flex
    flex-direction: column

.label
    @include label

.username
    margin-top: 14px

.phone
    margin-top: 4px

.login
    @include action
    margin-top: 9px

.disabled-login
    opacity: 0.5
</style>
