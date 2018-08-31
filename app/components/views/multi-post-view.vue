<style lang="scss">
    @import "../../style/_mixins.scss";

    .multi-post-view {
        @include main-content;

        .more-link {
            cursor: pointer;
        }
    }
</style>


<template>
    <div class="multi-post-view">
        <post v-for="(post) in apiPosts" :key="post.id" :api-post="post"></post>
        <a class="more-link" v-if="hasMorePosts" @click="loadMorePosts">More posts</a>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";
    import axios from "axios";
    
    import ApiPost from "../../coriander-api/ApiPost";
    import ApiPostSet from "../../coriander-api/ApiPostSet";
    import Post from '../post.vue';

    @Component({
        components: {
            "post": Post
        }
    })
    export default class MultiPostView extends Vue {
        apiPosts: ApiPost[] = [];
        nextPostId: number = null;

        @Prop({ default: null })
        tag: string;

        mounted() {
            this.apiPosts = [];
            this.nextPostId = null;
            this.loadPosts();
        }

        loadMorePosts(){
            this.loadPosts(this.nextPostId);
        }

        get hasMorePosts() {
            return this.nextPostId != null;
        }

        private loadPosts(nextId?: number) {
            const params = nextId != null ? `?next=${nextId}` : "";

            const response = axios.get(`http://localhost:3000/posts/all${params}`)
                .then(response => {
                    const data = response.data as ApiPostSet;

                    this.apiPosts.push(...data.posts);
                    this.nextPostId = data.next;
                });
        }
    }
</script>
