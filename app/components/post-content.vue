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

        h1 { font-size: $font-size-xxl; font-weight: bold; }
        h2 { font-size: $font-size-xl; font-weight: bold; }
        h3 { font-size: $font-size-lg; font-weight: bold; }
        h4,h5,h6 { font-size: $font-size-md; font-weight: bolder }

        a {
            color: $link-color;

            &:hover {
                color: $link-color-hover;
            }
        }

        em {
            font-style: italic;
        }

        strong {
            font-weight: bolder;
        }

        code {
            font-family: $code-font;
            color: $code-text-color;
            background-color: $code-text-background;
        }

        pre {
            background-color: $code-text-background;
        }

        img {
            max-width: 100%;
            max-height: 75vh;

            display: block;
            
            margin: ($rhythm-unit * 1.5rem) auto;
        }

        ul,ol {
            margin-bottom: $rhythm-unit * .5rem;
            margin-left: 2rem;            
        }

        ul {
            li {
                margin-left: -1rem;

                &:before {
                    content: "-";
                    margin-right: 1rem;
                    font-weight: bold;
                }
            }
        }

        ol {
            li {
                margin-left: -1rem;
                counter-increment: step-counter;

                &:before {
                    content: counter(step-counter) ".";
                    margin-right: 1rem;
                    font-size: $font-size-sm;
                    font-weight: bold;
                }
            }

            &::marker {
                font-size: $font-size-sm;
            }
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
