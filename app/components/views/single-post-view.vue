<style lang="scss">
    @import "../../style/_mixins.scss";

    .post-view {
        @include main-content;
    }

    .post-title {
        font-weight: bold;
        font-size: 3rem;

        margin: 3rem 0;
    }

    .social-links {
        font-size: .8rem;
    }
</style>


<template>
    <div class="post-view">
        <post-banner :banner-url="bannerUrl" :post-id="id"></post-banner>
        <div class="post-title">{{title}}</div>
        <social-shares class="social-links"></social-shares>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";
    import axios from "axios";

    import * as routeNames from "../../constants/routeNames";
    import ApiPost from '../../coriander-api/ApiPost';
    import SocialShares from '../library/social-shares.vue';
    import PostBanner from '../post-banner.vue';
    
    @Component({
        components: {
            "social-shares": SocialShares,
            "post-banner": PostBanner
        }
    })
    export default class SinglePostView extends Vue {
        private apiPost: ApiPost = null;

        @Prop({ default: null })
        postId: number;

        @Prop({ default: null })
        postSlug: string;

        get id() {
            return this.apiPost == null
                ? null
                : this.apiPost.id;
        }

        get title() {
            return this.apiPost == null
                ? "" 
                : this.apiPost.title;
        }

        get bannerUrl() {
            return this.apiPost == null
                ? ""
                : this.apiPost.banner;
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
