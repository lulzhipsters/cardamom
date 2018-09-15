<style lang="scss">
    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline; }

    /* HTML5 display-role reset for older browsers */

    article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block; }

    body {
    line-height: 1; }

    ol, ul {
    list-style: none; }

    blockquote, q {
    quotes: none; }

    blockquote {
    &:before, &:after {
        content: '';
        content: none; } }

    q {
    &:before, &:after {
        content: '';
        content: none; } }

    table {
    border-collapse: collapse;
    border-spacing: 0; }

    /* Custom */
    @import "../style/_transitions.scss";
    @import "../style/_variables.scss";
    @import "../style/_mixins.scss";

    html {
        font-size: calc( 18px + (22 - 18) * (100vw - 400px) / (800 - 350));

        @media only screen and (min-width: 800px){
            font-size: 22px;
        }
    }

    .app {
        font-family: $standard-font;
        color: $standard-text-color;
    }

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #8d8c8c96;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #8f8f8f;
    }
    ::-webkit-scrollbar-thumb:active {
        background: $scroll-active-color;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-track:hover {
        background: #e7e7e700;
    }
    ::-webkit-scrollbar-track:active {
        background: transparent;
    }
    ::-webkit-scrollbar-corner {
        background: transparent;
    }


</style>

<template>
    <div class="app">
        <main-header></main-header>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-typed";
    import Header from "./header.vue";
    import MultiPostView from "./views/multi-post-view.vue";
    
    @Component({
        components: {
            "main-header": Header,
            "multi-post-view": MultiPostView
        }
    })
    export default class App extends Vue{
        
    }
</script>