<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

const { dispatch } = useStore();

const userId = ref<string>('');
const title = ref<string>('');

const create = () => {
    dispatch('createTodo', {
        userId: userId.value,
        title: title.value,
    });
    userId.value = '';
    title.value = '';
};
</script>

<template>
    <div class="root">
        <Input
            id="user-id"
            type="text"
            v-model:value="userId"
            placeholder="User Id"
            withoutError
        />

        <Input
            id="title"
            type="text"
            v-model:value="title"
            placeholder="Title"
            withoutError
        />

        <Button
            type="button"
            @click="create"
        >
            Create Todo
        </Button>
    </div>
</template>

<style scoped lang="sass">
.root
    display: flex
    align-items: center
    gap: 20px
</style>
