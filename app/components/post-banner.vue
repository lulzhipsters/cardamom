<style lang="scss">
    @import "../style/_mixins.scss";

    .post-banner {
        width: 100%;

        img {
            width: 100%;
        }

        &.no-image {
            padding-bottom: 30%;

            &.back-0 { @include pattern-brady(#be83ee, #6a4f81, white)}//{ @include pattern-steps(#5f00ad, rgb(224, 204, 255))}//{ background-color: #2f50a3;}
            &.back-1 { @include pattern-seigaiha(#fa9176, white)}
            &.back-2 { @include pattern-shippo(#de4343)}
            &.back-3 { @include pattern-seigaiha(#348de7, #ccedfd)}
            &.back-4 { @include pattern-seigaiha(#0ec577, white)}//{ background-color: #0ec577; }
        }
    }
</style>

<template>
    <div class="post-banner" :class="imgClasses">
        <img :src="bannerUrl" >
    </div>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";

    @Component()
    export default class PostBanner extends Vue {
        @Prop({ default: "" })
        bannerUrl: string;

        @Prop()
        postId: number;

        get imgClasses() {
            const classes = {} as any;

            if(this.postId != null){
                const backgroundClass = `back-${this.postId % 5}`;
                classes[backgroundClass] = true;
                classes["no-image"] = !this.bannerUrl;
            }
            
            
            return classes
        }
    }
</script>
