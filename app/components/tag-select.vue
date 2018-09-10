<style lang="scss">
    @import "../style/_variables.scss";

    .tag-select {
        box-sizing: border-box;

        height: 0;
        width: 100%;
        transform: scaleY(0);
        transform-origin: top;
        transition: all .3s ease-out .2s;

        overflow-x: auto;
        background-color: $header-drawer-color;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        .tag {
            padding: .5rem;

            color: $header-text-color;
            font-size: $font-size-sm;

            transition: all .3s ease-out .0s;
            opacity: 0;
        }

        &.show {
            padding: 2rem;
            height: 30vh;
            transform: scaleY(1);    
            transition: all .3s ease-out 0s;
            
            .tag {
                opacity: 1;
                transition: all .3s ease-out .2s;
            }
        }
    }
</style>

<template>
    <div class="tag-select" :class="{ 'show': show }">
        <div class="tag" v-for="tag in tags" :key="tag">{{tag}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";
import ApiTagSet from "../coriander-api/ApiTagSet";

    @Component()
    export default class TagSelect extends Vue {
        tags: string[] = [];
        
        @Prop({ default: false })
        show: boolean;

        mounted() {
            this.$http.get("/tags/all")
                .then(response => {
                    const data = response.data as ApiTagSet

                    this.tags = data.tags;
                })
        }
    }
</script>

