<style lang="scss">
    @import "../../style/_mixins.scss";

    .post-view {
        @include main-content;
    }
</style>


<template>
    <div class="post-view">
        <div class="post-title">{{title}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";
    import axios from "axios";

    import * as routeNames from "../../constants/routeNames";
    import ApiPost from '../../coriander-api/ApiPost';
    
    @Component()
    export default class SinglePostView extends Vue {
        private apiPost: ApiPost = null;

        @Prop({ default: null })
        postId: number;

        @Prop({ default: null })
        postSlug: string;

        get title() {
            return this.apiPost == null
                ? "" 
                : this.apiPost.title;
        }

        mounted() {
            const postUrl = this.postSlug !== null ? `/posts/slug/${this.postSlug}` : `/posts/${this.postId}`;

            const response = this.$http.get(postUrl)
                .then(response => {
                    this.apiPost = response.data as ApiPost

                }).catch(e => {
                    this.$router.push({ name: routeNames.Error })

                    console.error(e);
                });
        }
    }
</script>
