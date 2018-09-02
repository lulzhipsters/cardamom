<style lang="scss">
    @import "../style/_variables.scss";

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

        .post-banner-container {
            &.no-image {
                background-color: #2f50a3;
                width: 100%;
                padding-bottom: 30%;
            }
            
        }
    }
</style>

<template>
    <div class="post">
        <div class="post-banner-container" :class="{ 'no-image': !apiPost.banner }"></div>
        <div class="post-title" role="button" @click="openPost">{{apiPost.title}}</div>
        <when-display class="published-date" :date="apiPost.publishedDate"></when-display>
        <tag-list class="tag-list" :tags="apiPost.tags" hide-after="2" justify="end"></tag-list>
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
    }
</script>
