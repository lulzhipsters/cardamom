<style lang="scss">
    @import "../style/_variables.scss";

    .tag-select {
        box-sizing: border-box;

        height: 0;
        width: 100%;
        transform: scaleY(0);
        transform-origin: top;
        transition: all .2s ease-out .2s;

        padding: 0 2rem;

        overflow-x: auto;
        background-color: $header-drawer-color;
        //border-top: 2px solid $header-text-color;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        .tag {
            padding: .5rem 1rem;

            color: $header-drawer-text-color;
            font-size: $font-size-sm;

            transition: all .2s ease-out .0s;
            opacity: 0;
        }

        &.show {
            padding: 2rem;
            height: 30vh;
            transform: scaleY(1);    
            transition: all .2s ease-out 0s;
            
            .tag {
                cursor: pointer;
                opacity: 1;
                transition: all .2s ease-out .2s;
            }
        }
    }
</style>

<template>
    <div class="tag-select" :class="{ 'show': show }">
        <div class="tag" v-for="tag in tags" :key="tag" role="button" @click="selectTag(tag)">{{tag}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-typed";
    import ApiTagSet from "../coriander-api/ApiTagSet";
    import * as routeNames from "../constants/routeNames";

    @Component({
        components: {
        }
    })
    export default class TagSelect extends Vue {
        tags: string[] = [];
        
        @Prop({ default: false })
        show: boolean;

        mounted() {
            this.$http.get("/tags/all")
                .then(response => {
                    const data = response.data as ApiTagSet

                    //sort alphabetically
                    this.tags = data.tags.sort((a, b) => {
                        if(a < b) { return -1; }
                        if(a > b) { return 1; }
                        return 0;
                    });
                })
        }

        selectTag(tag: string){
            this.$router.push({ name: routeNames.PostsWithTag, params: { tag: tag }})
        }
    }
</script>

