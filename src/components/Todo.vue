<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import Card from '../components/Card.vue';
import Button from './Button.vue';

interface Props {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    favorites?: number[] | null;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:favorites']);

const inactive = computed(() => !props.favorites?.includes(props.id));

const toggleFavorite = () => {
    const favorites = props.favorites;
    if (favorites === null) {
        localStorage.setItem('favorites', JSON.stringify([props.id]));
        emit('update:favorites', [props.id]);
    } else {
        if (favorites.includes(props.id)) {
            const index = favorites.indexOf(props.id);
            favorites.splice(index, 1);
        } else {
            favorites.push(props.id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        emit('update:favorites', favorites);
    }
};
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

            <Button
                type="button"
                :inactive="inactive"
                @click="toggleFavorite"
            >
                Favorite
            </Button>
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
