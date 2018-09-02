<style lang="scss">
    @import "../../style/_variables.scss";
    @import "../../style/_mixins.scss";

    .multi-post-view {
        @include main-content;

        .more-link {
            cursor: pointer;

            font-weight: bold;
            color: $muted-text-color;

            margin-top: 2rem;

            &:hover {
                color: darken($muted-text-color, 25%);
            }
        }

        .post {
            margin-bottom: 7rem;
        }
    }
</style>


<template>
    <div class="multi-post-view">
        <post class="post" v-for="(post) in apiPosts" :key="post.id" :api-post="post"></post>
        <infinite-load v-if="hasMorePosts" @infinite="loadMorePosts" spinner="waveDots"></infinite-load>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop, Watch } from "vue-typed";
    import InfiniteLoading from "vue-infinite-loading";
    
    import ApiPost from "../../coriander-api/ApiPost";
    import ApiPostSet from "../../coriander-api/ApiPostSet";
    import Post from '../post.vue';

    @Component({
        components: {
            "post": Post,
            "infinite-load": InfiniteLoading
        }
    })
    export default class MultiPostView extends Vue {
        apiPosts: ApiPost[] = [];
        nextPostId: number = null;

        @Prop({ default: null })
        tag: string;

        @Watch("tag")
        onTagChanged(val: string){
            this.apiPosts = [];
            this.nextPostId = null;
            this.loadPosts();
        }

        mounted() {
            this.apiPosts = [];
            this.nextPostId = null;
            this.loadPosts();
        }

        loadMorePosts(){
            if(this.nextPostId != null){
                this.loadPosts();
            }
        }

        get hasMorePosts() {
            return this.nextPostId != null;
        }

        loadPosts() {
            const route = !this.tag ? "/posts/all" : `/posts/tagged/${this.tag}`;
            const params = this.nextPostId != null ? `?next=${this.nextPostId}` : "";

            const response = this.$http.get(`${route}${params}`)
                .then(response => {
                    const data = response.data as ApiPostSet;

                    this.apiPosts.push(...data.posts);
                    this.nextPostId = data.next;
                });
        }
    }
</script>
