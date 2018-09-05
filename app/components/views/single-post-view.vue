<style lang="scss">
    @import "../../style/_mixins.scss";
    @import "../../style/_variables.scss";

    .post-view {
        @include main-content;
    }

    .post-title {
        //font-weight: bold;
        font-family: $header-font;
        font-size: $font-size-xxxl;
        margin: 1rem 0;
    }

    .post-published {
        font-size: $font-size-sm;
        color: $muted-text-color;
        margin-bottom: .5rem;
    }

    .post-content {
        margin: 3rem 0 4rem;
        
        $rhythm-unit: 1.5;
        line-height: $rhythm-unit;

        p {
            //text-align: justify;
            font-size: $font-size-md;
            margin-bottom: $rhythm-unit * .5rem;
        }

        h1,h2,h3,h4,h5,h6 {
            font-family: $header-font;
            // font-weight: bold;
            margin: ($rhythm-unit * 2rem) 0 ($rhythm-unit * .75rem);
        }

        h1 { font-size: $font-size-xxl; }
        h2 { font-size: $font-size-xl; }
        h3 { font-size: $font-size-lg; }
        h4,h5,h6 { font-size: $font-size-md; font-weight: bolder }

        a {
            color: $link-color;

            &:hover {
                color: $link-color-hover;
            }
        }

        code {
            font-family: $code-font;
            color: $code-text-color;
            background-color: $code-text-background;
            padding: 0 .3rem .2rem;
        }
    }

    .post-tags {
        margin-bottom: 4rem;
        font-size: .8rem;
    }

    .share-prompt {
        margin-bottom: .5rem;
        color: $muted-text-color;
    }

    .social-links {
        font-size: .8rem;
    }
</style>


<template>
    <div class="post-view">
        <post-banner :banner-url="bannerUrl" :post-id="id"></post-banner>
        <div class="post-title">{{title}}</div>
        <when-display class="post-published" :date="publishedDate"></when-display>
        
        <markdown-render class="post-content" :text="content"></markdown-render>
        
        <tag-list class="post-tags" :tags="tags" justify="start"></tag-list>
        <content-divider></content-divider>

        <div class="share-prompt">Share this:</div>
        <social-shares class="social-links"></social-shares>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";

    import * as routeNames from "../../constants/routeNames";
    import ApiPost from '../../coriander-api/ApiPost';
    import SocialShares from '../library/social-shares.vue';
    import PostBanner from '../post-banner.vue';
    import MarkdownRender from '../library/markdown-render.vue';
    import WhenDisplay from '../library/when-display.vue';
    import TagList from '../library/tag-list.vue';
    import ContentDivider from '../library/content-divider.vue';
    
    @Component({
        components: {
            "social-shares": SocialShares,
            "post-banner": PostBanner,
            "markdown-render": MarkdownRender,
            "when-display": WhenDisplay,
            "tag-list": TagList,
            "content-divider": ContentDivider
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

        get publishedDate() {
            return this.apiPost == null
                ? ""
                : this.apiPost.publishedDate;
        }

        get tags(): string[] {
            return this.apiPost == null
                ? []
                : this.apiPost.tags;
        }

        get content() {
            return this.apiPost == null
                ? ""
                : this.apiPost.content;
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
