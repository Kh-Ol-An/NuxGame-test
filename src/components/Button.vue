<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    classes: {
        type: String,
        required: false,
    },
    inactive: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['click']);
const click = () => emit('click');
</script>

<template>
    <button
        :class="['action', classes, inactive && 'inactive', disabled && 'disabled']"
        :type="type"
        :disabled="disabled"
        @click="click"
    >
        <slot>Action</slot>
    </button>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'

.action
    padding: 10px 30px
    border-radius: $primary-radius
    border: 2px solid $action-color
    background-color: $action-color
    color: $white-color
    font-size: $primary-font-size
    font-style: normal
    font-weight: $bold-weight
    line-height: $primary-line-height
    letter-spacing: $primary-letter-spacing
    cursor: pointer

.inactive
    background-color: transparent
    color: $action-color

.disabled
    opacity: 0.5
</style>