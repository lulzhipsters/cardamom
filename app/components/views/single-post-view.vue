<style lang="scss">
    @import "../../style/_mixins.scss";
    @import "../../style/_variables.scss";

    .post-view {
        @include main-content;
    }

    .post-title {
        font-family: $header-font;
        font-size: $font-size-xxxl;
        margin: 3rem 0 .5rem;
    }

    .post-published {
        font-size: $font-size-sm;
        color: $muted-text-color;
        margin-bottom: .5rem;
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
        
        <post-content class="post-content" :text="content"></post-content>

        <tag-list class="post-tags" :tags="tags" justify="start"></tag-list>
        <content-divider></content-divider>

        <div class="share-prompt">Share this:</div>
        <social-shares class="social-links"></social-shares>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop, Watch } from "vue-typed";

    import * as routeNames from "../../constants/routeNames";
    import ApiPost from '../../coriander-api/ApiPost';
    import SocialShares from '../library/social-shares.vue';
    import PostBanner from '../post-banner.vue';
    import WhenDisplay from '../library/when-display.vue';
    import TagList from '../library/tag-list.vue';
    import ContentDivider from '../library/content-divider.vue';
    import PostContent from '../post-content.vue';
    
    @Component({
        components: {
            "social-shares": SocialShares,
            "post-banner": PostBanner,
            "post-content": PostContent,
            "when-display": WhenDisplay,
            "tag-list": TagList,
            "content-divider": ContentDivider
        }
    })
    export default class SinglePostView extends Vue {
        private apiPost: ApiPost = null;

        @Prop({ default: null })
        postSlug: string;

        @Watch("postSlug")
        onSlugChange() {
            this.loadPost();
        }

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
            this.loadPost()
                .then(() => {
                    document.dispatchEvent(new Event("scrollToSaved"));
                })
        }

        private loadPost(){
            return this.$http.get(`/posts/slug/${this.postSlug}`)
                .then(response => {
                    this.apiPost = response.data as ApiPost
                }).catch(e => {
                    this.$router.push({ name: routeNames.Error })

                    console.error(e);
                });
        }
    }
</script>
