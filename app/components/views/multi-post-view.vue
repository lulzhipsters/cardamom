<template>
    <div class="multi-post-view">
        <post v-for="(post) in displayPosts" :key="post.id" :display-post="post"></post>
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
        private apiPosts: ApiPost[] = [];
        private nextPostId: number = null;

        get displayPosts(){
            return this.apiPosts.map(post => {
                return {
                    id: post.id
                };
            });
        }

        mounted() {
            this.loadPosts();
        }

        loadPosts() {
            if(this.nextPostId == null && this.apiPosts.length !== 0){
                console.warn("No more posts");
            }

            const response = axios.get("http://localhost:3000/posts/all")
                .then(response => {
                    const data = response.data as ApiPostSet;

                    this.apiPosts.push(...data.posts);
                    this.nextPostId = data.next;
                });
        }
    }
</script>
