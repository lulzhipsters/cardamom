<style lang="scss">
    .post {
        .post-title {
            font-weight: bold;
            font-size: 2rem;
        }

        margin-bottom: 2rem;

        cursor: pointer;
    }
</style>


<template>
    <div class="post" role="button" @click="openPost">
        <div class="post-banner-container"></div>
        <div class="post-title">{{apiPost.title}}</div>
        Post with Id: {{apiPost.id}}
    </div>
</template>


<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";

    import * as routeNames from "../constants/routeNames";

    import ApiPost from "../coriander-api/ApiPost"; 

    @Component()
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
