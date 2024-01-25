<template>
    <div class="loading-root">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<style scoped lang="sass">
@import '../styles/setup/variables.sass'

.loading-root
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 9999
    width: 100%
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
    background-color: $primary-color

.lds-dual-ring
    display: inline-block
    width: 80px
    height: 80px

    &:after
        content: " "
        display: block
        width: 64px
        height: 64px
        margin: 8px
        border-radius: 50%
        border: 6px solid $white-color
        border-color: $white-color transparent $white-color transparent
        animation: lds-dual-ring 1.2s linear infinite

@keyframes lds-dual-ring
    0%
        transform: rotate(0deg)

    100%
        transform: rotate(360deg)
</style>