<style lang="scss">
    @import "../style/_variables.scss";
    @import "../style/_mixins.scss";

    .post {
        .post-title {
            cursor: pointer;
            font-weight: bold;
            font-size: 2rem;
            margin: .5rem 0 .5rem 0;
        }

        .published-date {
            font-size: .8rem;
            color: $muted-text-color;
        }

        .post-banner {
            width: 100%;

            &.no-image {
                padding-bottom: 30%;
            }

            &.back-0 { @include pattern-brady(#be83ee, #6a4f81, white)}//{ @include pattern-steps(#5f00ad, rgb(224, 204, 255))}//{ background-color: #2f50a3;}
            &.back-1 { @include pattern-seigaiha(#fa9176, white)}
            &.back-2 { @include pattern-shippo(#de4343)}
            &.back-3 { @include pattern-seigaiha(#348de7, #ccedfd)}
            &.back-4 { @include pattern-seigaiha(#0ec577, white)}//{ background-color: #0ec577; }
        }
    }
</style>

<template>
    <div class="post">
        <img class="post-banner" :src="apiPost.banner" :class="imgClasses">
        <div class="post-title" role="button" @click="openPost">{{apiPost.title}}</div>
        <when-display class="published-date" :date="apiPost.publishedDate"></when-display>
        <tag-list class="tag-list" :tags="apiPost.tags" hide-after="3" justify="end"></tag-list>
    </div>
</template>


<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";

    import * as routeNames from "../constants/routeNames";

    import ApiPost from "../coriander-api/ApiPost"; 
    import WhenDisplay from "./library/when-display.vue";
    import TagList from "./library/tag-list.vue";

    @Component({
        components: {
            "when-display": WhenDisplay,
            "tag-list": TagList
        }
    })
    export default class Post extends Vue {
        @Prop()
        apiPost: ApiPost

        openPost(){
            this.$router.push({ 
                    name: routeNames.PostBySlug,
                    params: { postSlug: this.apiPost.slug }
                })
        }

        get imgClasses() {
            const classes = { 
                "no-image": !this.apiPost.banner,
            } as any;

            const backgroundClass = `back-${this.apiPost.id % 5}`;

            classes[backgroundClass] = true;
            
            return classes
        }
    }
</script>
