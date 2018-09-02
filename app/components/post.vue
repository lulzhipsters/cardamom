<style lang="scss">
    @import "../style/_variables.scss";

    .post {
        .title-container {
            margin: .5rem 0 .5rem 0;
        }

        .post-title {
            cursor: pointer;
            font-weight: bold;
            font-size: 2rem;
        }

        .post-banner-container {
            cursor: pointer;
        }

        .published-date {
            font-size: .8rem;
            color: $muted-text-color;
        }
    }
</style>

<template>
    <div class="post">
        <div class="post-banner-container" @click="openPost">
            <post-banner :banner-url="apiPost.banner" :post-id="apiPost.id"></post-banner>
        </div>
        <div class="title-container">
            <span class="post-title" role="button" @click="openPost">{{apiPost.title}}</span>
        </div>
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
    import PostBanner from "./post-banner.vue";

    @Component({
        components: {
            "when-display": WhenDisplay,
            "tag-list": TagList,
            "post-banner": PostBanner
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
