<style lang="scss">
    @import "../../style/_variables.scss";
    @import "../../style/_mixins.scss";

    .multi-post-view {
        @include main-content;

        .post {
            margin-bottom: 5rem;
        }
    }
</style>


<template>
    <div class="multi-post-view">
        <transition-group name="fade">
            <current-tag-bar :tag="tag" v-if="tag != null" key="tag-bar"></current-tag-bar>
            <post class="post" v-for="(post) in apiPosts" :key="post.id" :api-post="post"></post>
        </transition-group>
        <infinite-load v-if="hasMorePosts" @infinite="loadMorePosts" spinner="waveDots"></infinite-load>
        <scroll-to-top></scroll-to-top>
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
    import ToTop from '../library/to-top.vue';

    @Component({
        components: {
            "post": Post,
            "infinite-load": InfiniteLoading,
            "current-tag-bar": CurrentTagBar,
            "scroll-to-top": ToTop
        }
    })
    export default class MultiPostView extends Vue {
        apiPosts: ApiPost[] = [];
        nextPostId: number = null;

        @Prop({ default: null })
        tag: string;

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
            this.loadPosts(this.postsUrl)
                .then(() => {
                    Vue.nextTick()
                        .then(() => document.dispatchEvent(new Event("scrollToSaved")));
                });
        }

        get hasMorePosts() {
            return this.nextPostId != null;
        }

        loadPosts(url: string) {
            return this.$http.get(url)
                .then(response => {
                    const data = response.data as ApiPostSet;

                    this.apiPosts.push(...data.posts);
                    this.nextPostId = data.next;
                });
        }
    }
</script>
