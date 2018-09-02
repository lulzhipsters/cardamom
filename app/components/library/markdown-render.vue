<template>
    <div v-html="html"></div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";
    import * as showdown from "showdown";

    @Component()
    export default class MarkdownRender extends Vue {
        private converter = new showdown.Converter();
        
        @Prop({ default: "" })
        text: string;

        get html() {
            return this.converter.makeHtml(this.text);
        }
    }
</script>

