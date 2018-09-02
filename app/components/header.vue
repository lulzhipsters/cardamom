<style lang="scss">
    @import "../style/_variables.scss";
    .header {
        width: 100%;
        height: 4rem;

        box-sizing: border-box;
        padding: .5rem;

        background-color: #8a5be1;
        color: #f4f4f4;

        .title {
            font-size: 3rem;
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

