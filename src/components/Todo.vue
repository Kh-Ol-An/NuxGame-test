<script setup lang="ts">
import Card from '../components/Card.vue';

defineProps({
    userId: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <Card>
        <template v-slot:header>Todo #: {{ id }}</template>

        <div class="body">
            <div class="field">
                <span class="label">User Id:</span>
                <span>{{ userId }}</span>
            </div>

            <div class="field">
                <span class="label">Title:</span>
                <span>{{ title }}</span>
            </div>

            <div class="field">
                <span :class="[completed ? 'completed' : 'uncompleted']">
                    {{ completed ? 'Completed' : 'Uncompleted' }}
                </span>
            </div>
        </div>
    </Card>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.body
    @include card-body

.field
    @include card-field

.label
    @include label

.completed
    color: $action-color

.uncompleted
    color: $warning-color
</style>
