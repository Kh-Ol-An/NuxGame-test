<script setup lang="ts">
import { defineProps, ref, computed, defineEmits, onMounted, onBeforeUnmount } from 'vue';

interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    value: Option | null;
    label: string;
}

defineProps<Props>();

const emit = defineEmits(['update:value']);

const showDropDown = ref(false);

const selectedOption = ref<Option | null>(null);

const dropDown = ref<HTMLDivElement | null>(null);

const toggleOption = (option) => {
    selectedOption.value = option;
    emit('update:value', option);
    showDropDown.value = false;
};

const mappedSelectedOption = computed(() => {
    return (selectedOption?.value?.label || selectedOption.value || 'Please select filter');
});

const closeDropDown = (element) => {
    if (dropDown.value?.contains(element.target)) return;
    showDropDown.value = false;
};

onMounted(() => {
    window.addEventListener('click', closeDropDown);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown);
});
</script>

<template>
    <div class="root">
        <span class="label">{{ label }}</span>

        <div class="dropdown-wrapper" ref="dropDown">
            <div class="dropdown-selected-option" @click="showDropDown = !showDropDown">
                {{ mappedSelectedOption }}
            </div>

            <div class="options-wrapper" v-if="showDropDown">
                <div class="option" v-for="option in options" :key="option.value" @click="toggleOption(option)">
                    {{ option.label || option }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.root
    display: flex
    align-items: center
    gap: 8px

.label
    @include label
    color: $white-color
    line-height: 32px

.dropdown-wrapper
    position: relative
    width: 200px
    cursor: pointer

.dropdown-selected-option
    padding: 8px
    background-color: $white-color
    border-radius: $primary-radius
    margin-bottom: 4px

.options-wrapper
    position: absolute
    top: 100%
    left: 0
    width: 100%
    z-index: 1
    overflow: hidden
    border-radius: $primary-radius

.option
    padding: 8px
    background-color: $white-color

    &:hover
        background-color: $accept-color
</style>