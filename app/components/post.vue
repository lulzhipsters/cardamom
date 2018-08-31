<template>
    <div class="post">
        Post with Id: {{displayPost.id}}
    </div>
</template>


<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";
    import ApiPost from "../coriander-api/ApiPost"; 

    interface DisplayPost {
        id: number;
    }

    @Component()
    export default class Post extends Vue {
        @Prop()
        displayPost: DisplayPost
    }
</script>
