<script setup lang="ts">
import { useStore } from '../store';
import Card from '../components/Card.vue';

const { state, dispatch } = useStore();
const user = state.auth.user;
const address = state.auth.user.address;
const company = state.auth.user.company;
</script>

<template>
    <div class="root">
        <Card>
            <template v-slot:header>Personal data</template>

            <div class="body">
                <div class="field">
                    <span class="label">Identifier:</span>
                    <span>{{ user.id }}</span>
                </div>

                <div class="field">
                    <span class="label">Full name:</span>
                    <span>{{ user.name }}</span>
                </div>

                <div class="field">
                    <span class="label">Nick:</span>
                    <span>{{ user.username }}</span>
                </div>

                <div class="field">
                    <span class="label">E-mail:</span>
                    <span>{{ user.email }}</span>
                </div>

                <div class="field">
                    <span class="label">Phone:</span>
                    <span>{{ user.phone }}</span>
                </div>

                <div class="field">
                    <span class="label">Website:</span>
                    <span>{{ user.website }}</span>
                </div>
            </div>
        </Card>

        <Card>
            <template v-slot:header>Address</template>

            <div class="body">
                <div class="field">
                    <span class="label">Street:</span>
                    <span>{{ address.street }}</span>
                </div>

                <div class="field">
                    <span class="label">Suite:</span>
                    <span>{{ address.suite }}</span>
                </div>

                <div class="field">
                    <span class="label">City:</span>
                    <span>{{ address.city }}</span>
                </div>

                <div class="field">
                    <span class="label">Zipcode:</span>
                    <span>{{ address.zipcode }}</span>
                </div>

                <div class="field">
                    <span class="label">Geo latitude:</span>
                    <span>{{ address.geo.lat }}</span>
                </div>

                <div class="field">
                    <span class="label">Geo longitude:</span>
                    <span>{{ address.geo.lng }}</span>
                </div>
            </div>
        </Card>

        <Card>
            <template v-slot:header>Company</template>

            <div class="body">
                <div class="field">
                    <span class="label">Company Name:</span>
                    <span>{{ company.name }}</span>
                </div>

                <div class="field">
                    <span class="label">Catchphrase:</span>
                    <span>{{ company.catchPhrase }}</span>
                </div>

                <div class="field">
                    <span class="label">Business Aspects:</span>
                    <span>{{ company.bs }}</span>
                </div>
            </div>
        </Card>

        <button class="logout" type="button" @click="dispatch('logout')">logout</button>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'
@import '../styles/setup/mixins.sass'

.root
    display: grid
    gap: 10px

    @media (min-width: 768px)
        grid-template-columns: repeat(2, 1fr)

    @media (min-width: 1366px)
        grid-template-columns: repeat(3, 1fr)

.body
    @include card-body

.field
    @include card-field

.label
    @include label

.logout
    @include action

    @media (min-width: 1366px)
        grid-column: 2/3
</style>