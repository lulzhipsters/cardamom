<template>
    <div v-html="html"></div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";
    import * as showdown from "showdown";

    @Component()
    export default class MarkdownRender extends Vue {
        private converter: showdown.Converter = null;
        
        @Prop({ default: "" })
        text: string;

        created(){
            this.converter = new showdown.Converter({
                ghCodeBlocks: true,
                strikethrough: true,
                emoji: true //emoji not in ts def at this time
            } as any)
        }

        get html() {
            return this.converter.makeHtml(this.text);
        }
    }
</script>

