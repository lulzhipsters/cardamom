<style lang="scss">
    @import "../../style/_variables.scss";

    .to-top-container {
        text-align: center;
    }

    .to-top {
        cursor: pointer;
        transition: all .3s;

        font-size: $font-size-sm;
        color: $muted-text-color;
        font-weight: 100;
        padding: .25rem .5rem;
        border-radius: 3px;

        display: inline-block;

        &:hover {
            background-color: $scroll-top-color;
            color: $standard-text-color;
        }
    }
</style>

<template>
    <div class="to-top-container">
        <div class="to-top" role="button" @click="scrollToTop">Back to top</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-typed";

    @Component()
    export default class ToTop extends Vue {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
</script>

