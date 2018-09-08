<style lang="scss">
    @import "../../style/_variables.scss";
    @import "../../style/_mixins.scss";

    .multi-post-view {
        @include main-content;

        .post {
            margin-bottom: 7rem;
        }
    }
</style>


<template>
    <div class="multi-post-view">
        <current-tag-bar :tag="tag" v-if="tag != null"></current-tag-bar>
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
    import CurrentTagBar from '../current-tag-bar.vue';

    @Component({
        components: {
            "post": Post,
            "infinite-load": InfiniteLoading,
            "current-tag-bar": CurrentTagBar
        }
    })
    export default class MultiPostView extends Vue {
        apiPosts: ApiPost[] = [];
        nextPostId: number = null;

        @Prop({ default: null })
        tag: string;

        @Watch("tag")
        onTagChanged(val: string){
            this.loadNewPosts();
        }

        mounted() {
            this.loadNewPosts();
        }

        get postsUrl() {
            return !this.tag ? "/posts/all" : `/posts/tagged/${this.tag}`;
        }

        loadMorePosts(){
            if(this.nextPostId != null){
                this.loadPosts(`this.postsUrl?next=${this.nextPostId}`);
            }
        }

        loadNewPosts() {
            this.apiPosts = [];
            this.nextPostId = null;
            this.loadPosts(this.postsUrl);
        }

        get hasMorePosts() {
            return this.nextPostId != null;
        }

        loadPosts(url: string) {
            this.$http.get(url)
                .then(response => {
                    const data = response.data as ApiPostSet;

                    this.apiPosts.push(...data.posts);
                    this.nextPostId = data.next;
                });
        }
    }
</script>
