<style lang="scss">
    @import "../style/_variables.scss";

    .current-tag-bar {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 2rem;
        padding: .75rem;

        color: $tag-bar-text-color;
        background-color: $tag-bar-color;
        font-size: $font-size-md;

        border-radius: 2px;

        display: inline-flex;
        justify-content: space-between;
        align-items: center;

        .remove-link {
            cursor: pointer;
            font-size: $font-size-sm;
            color: $muted-text-color;
            text-align: right;
        }

        .tag {
            font-weight: bold;
        }
    }
</style>

<template>
    <div class="current-tag-bar">
        <span class="text">Showing posts tagged with <span class="tag">{{tag}}</span></span>
        <a class="remove-link" @click="removeTagFilter">remove</a>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";

    import * as routeNames from "../constants/routeNames";

    @Component()
    export default class CurrentTagBar extends Vue {
        @Prop({ default: null })
        tag: string;

        removeTagFilter() {
            this.$router.push({ name: routeNames.Posts});
        }
    }
</script>
