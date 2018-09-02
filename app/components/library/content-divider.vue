<style lang="scss">
    @import "../../style/_variables.scss";

    .content-divider {
        width: 100%;
        height: 5px;

        background-color: $standard-text-color;

        margin: 2rem 0;
    }
</style>


<template>
    <div class="content-divider"></div>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default class ContentDivider extends Vue {

    }
</script>
