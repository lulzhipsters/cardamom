<style lang="scss">
    @import "../style/_variables.scss";
    .header {
        width: 100vw;
        height: 4rem;

        box-sizing: border-box;
        padding: .5rem;

        background-color: #8a5be1;
        color: #f4f4f4;

        .title {
            font-size: 3rem;
            font-family: $accent-font;
        }
    }
</style>

<template>
    <div class="header">
        <div class="title">Cardamom</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from "vue-typed";

    @Component()
    export default class Header extends Vue {
        
    }
</script>

