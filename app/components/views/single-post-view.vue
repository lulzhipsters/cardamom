<template>
    <div class="post-view">

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
        private apiPost: ApiPost

        @Prop({ default: null })
        postId: number;

        @Prop({ default: null })
        postSlug: string;

        mounted() {
            const postUrl = this.postSlug !== null 
                ? `http://localhost:3000/posts/slug/${this.postSlug}`
                : `http://localhost:3000/posts/${this.postId}`;

            const response = axios.get(postUrl)
                .then(response => {
                    this.apiPost = response.data as ApiPost
                }).catch(e => {
                    this.$router.push({ name: routeNames.Error })

                    console.error(e);
                });
        }
    }
</script>
