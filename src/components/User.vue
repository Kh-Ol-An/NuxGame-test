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
                    <span class="value">{{ user.id }}</span>
                </div>

                <div class="field">
                    <span class="label">Full name:</span>
                    <span class="value">{{ user.name }}</span>
                </div>

                <div class="field">
                    <span class="label">Nick:</span>
                    <span class="value">{{ user.username }}</span>
                </div>

                <div class="field">
                    <span class="label">E-mail:</span>
                    <span class="value">{{ user.email }}</span>
                </div>

                <div class="field">
                    <span class="label">Phone:</span>
                    <span class="value">{{ user.phone }}</span>
                </div>

                <div class="field">
                    <span class="label">Website:</span>
                    <span class="value">{{ user.website }}</span>
                </div>
            </div>
        </Card>

        <Card>
            <template v-slot:header>Address</template>

            <div class="body">
                <div class="field">
                    <span class="label">Street:</span>
                    <span class="value">{{ address.street }}</span>
                </div>

                <div class="field">
                    <span class="label">Suite:</span>
                    <span class="value">{{ address.suite }}</span>
                </div>

                <div class="field">
                    <span class="label">City:</span>
                    <span class="value">{{ address.city }}</span>
                </div>

                <div class="field">
                    <span class="label">Zipcode:</span>
                    <span class="value">{{ address.zipcode }}</span>
                </div>

                <div class="field">
                    <span class="label">Geo latitude:</span>
                    <span class="value">{{ address.geo.lat }}</span>
                </div>

                <div class="field">
                    <span class="label">Geo longitude:</span>
                    <span class="value">{{ address.geo.lng }}</span>
                </div>
            </div>
        </Card>

        <Card>
            <template v-slot:header>Company</template>

            <div class="body">
                <div class="field">
                    <span class="label">Company Name:</span>
                    <span class="value">{{ company.name }}</span>
                </div>

                <div class="field">
                    <span class="label">Catchphrase:</span>
                    <span class="value">{{ company.catchPhrase }}</span>
                </div>

                <div class="field">
                    <span class="label">Business Aspects:</span>
                    <span class="value">{{ company.bs }}</span>
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
    grid-template-columns: repeat(3, 1fr)
    gap: 10px

.body
    padding: 20px
    display: flex
    align-items: center
    flex-direction: column
    gap: 10px

.field
    display: flex
    align-items: center
    gap: 6px

.label
    @include label

.value
    display: flex
    align-items: center
    gap: 6px

.logout
    @include action
    grid-column: 2/3
</style>