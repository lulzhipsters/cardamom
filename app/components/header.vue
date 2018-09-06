<style lang="scss">
    @import "../style/_variables.scss";
    .header {
        width: 100%;

        box-sizing: border-box;
        padding: .75rem 1rem;

        background-color: $header-color;
        color: $header-text-color;

        .title {
            font-size: $font-size-xxl;
            font-family: $accent-font;
            cursor: pointer;
        }
    }
</style>

<template>
    <div class="header">
        <span class="title" role="button" @click="goHome">Cardamom</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from "vue-typed";

    @Component()
    export default class Header extends Vue {
        goHome(){
            this.$router.push("/");
        }
    }
</script>

