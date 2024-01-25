<template>
    <div class="card">
        <div class="header">
            <slot name="header"></slot>
        </div>

        <slot></slot>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'

.card
    width: 100%
    border-radius: $primary-radius
    background-color: $accept-color
    overflow: hidden

    @media (min-width: 1440px)
        width: 448px

.header
    padding: 14px
    color: $special-color
    font-size: $primary-font-size
    font-style: normal
    font-weight: $normal-weight
    line-height: $primary-line-height
    letter-spacing: $primary-letter-spacing
    background-color: $secondary-color
    text-align: center
</style>