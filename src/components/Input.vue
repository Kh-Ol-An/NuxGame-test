<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    classes: {
        type: String,
        default: '',
    },
    value: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    withoutError: {
        type: Boolean,
        default: false,
    },
    errors: {
        type: Array,
        required: false,
    },
});

const emit = defineEmits(['update:value']);
const input = (event) => emit('update:value', event.target.value);
</script>

<template>
    <div :class="['input-container', classes]">
        <input
            class="input"
            :id="id"
            :name="id"
            type="text"
            :placeholder="placeholder"
            :value="value"
            :autocomplete="id"
            @input="input"
        />

        <ul class="errors" v-if="!withoutError">
            <li class="error" v-for="error in errors" :key="error.$uid">
                {{ error.$message }}
            </li>
        </ul>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'

.input-container
    display: flex
    flex-direction: column
    gap: 4px

.input
    padding: 10px
    border-radius: $primary-radius
    border: none
    outline: none
    background-color: $white-color
    color: $special-two-color
    font-size: $primary-font-size
    font-style: normal
    font-weight: $normal-weight
    line-height: $primary-line-height
    letter-spacing: $primary-letter-spacing

.errors
    min-height: $special-font-size

.error
    color: $warning-color
    font-size: $special-font-size
    font-style: normal
    font-weight: $bold-weight
</style>