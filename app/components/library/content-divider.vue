<style lang="scss">
    @import "../../style/_variables.scss";

    .content-divider {
        width: 100%;
        height: 2px;

        background-color: #dadada;

        margin: 1rem 0;
    }
</style>


<template>
    <div class="content-divider"></div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from "vue-typed";

    @Component()
    export default class ContentDivider extends Vue {

    }
</script>
