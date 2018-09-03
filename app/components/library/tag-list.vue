<style lang="scss">
    @import "../../style/_variables.scss";

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        margin: 0 -.2rem;

        &.flex-start {
            justify-content: flex-start;
        }

        &.flex-end {
            justify-content: flex-end;
        }

        .tag-badge,
        .toggle-more {
            padding: .3rem .5rem .3rem .5rem;
            margin: .1rem;
            border-radius: 3px;
        }

        .tag-badge {
            background-color: #dadada;
            white-space: nowrap;
            cursor: pointer;

            &:hover {
                background-color: darken(#dadada, 10);
            }
        }

        .toggle-more {
            background-color: #a6a6a6;
            cursor: pointer;

            &:hover {
                background-color: darken(#a6a6a6, 10);
            }
        }
    }
</style>


<template>
    <div class="tag-list" :class="flexJustify">
        <span class="tag-badge" v-for="tag in displayedTags" :key=tag @click="goToTag(tag)">{{tag}}</span>
        <span class="toggle-more" v-if="enableHide" @click="toggleShow">{{showHideText}}</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";

    import * as routeNames from "../../constants/routeNames";
    
    @Component()
    export default class TagList extends Vue {
        @Prop({ default: [] })
        tags: string[]
        
        @Prop({ default: null })
        hideAfter: number;

        @Prop({ default: "start" })
        justify: "start" | "end";

        showAll = false;

        toggleShow() {
            this.showAll = !this.showAll;
        }

        goToTag(tag: string) {
            this.$router.push({ name: routeNames.PostsWithTag, params: { tag: tag } });
        }

        get displayedTags() {
            return this.hideAfter == null || this.showAll
                ? this.tags
                : this.tags.slice(0, this.hideAfter)
        }

        get showHideText() {
            return this.showAll
                ? "-"
                : "+"
        }

        get enableHide() {
            return (this.hideAfter != null && this.tags.length > 0) 
                && this.tags.length > this.hideAfter;
        }

        get flexJustify() {
            return `flex-${this.justify}`;
        }
    }
</script>
