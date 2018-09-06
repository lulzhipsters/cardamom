<style lang="scss">
    @import "../style/_variables.scss";

    .post-content {
        margin: 3rem 0;
        
        $rhythm-unit: 1.5;
        line-height: $rhythm-unit;

        p {
            font-size: $font-size-md;
            margin-bottom: $rhythm-unit * .5rem;
        }

        h1,h2,h3,h4,h5,h6 {
            font-family: $header-font;
            margin: ($rhythm-unit * 1.75em) 0 ($rhythm-unit * .5em);
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
            padding: .1rem .3rem;
        }

        img {
            max-width: 100%;
            max-height: 75vh;

            display: block;
            
            margin: ($rhythm-unit * 1.5rem) auto;
        }
    }
</style>

<template>
    <markdown-render class="post-content" :text="text"></markdown-render>
</template>



<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";
    import MarkdownRender from "./library/markdown-render.vue";

    @Component({
        components: {
            "markdown-render": MarkdownRender
        }
    })
    export default class PostContent extends Vue {
        @Prop()
        text: string;
    }
</script>
