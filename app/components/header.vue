<style lang="scss">
    @import "../style/_variables.scss";
    .header {
        position: fixed;
        width: 100%;
        top: 0;

        .header-bar {
            width: 100%;

            box-sizing: border-box;
            padding: .75rem 1rem;

            background-color: $header-color;
            color: $header-text-color;

            //border-bottom: 2px solid $header-text-color;

            display: flex;
            justify-content: space-between;
            align-items: center;

            .title-container {
                display: flex;
                align-items: center;
                
                cursor: pointer;
            }

            .title {
                display: inline-block;
                font-size: $font-size-xxl;
                font-family: $accent-font;
            }

            .sub-title {
                font-size: $font-size-xs;
                letter-spacing: 1px;
            }

            .logo-img {
                margin: -.5rem .5rem -.5rem 0;

                display: inline-block;
                background-image: $logo-image;
                background-repeat: no-repeat;
                background-size: fit;
                height: 4rem;
                width: 4rem;
                
            }

            .tag-button {
                cursor: pointer;
                font-size: $font-size-sm;
                color: $muted-text-color;
            }
        }
    }
</style>

<template>
    <div id="header" class="header">
        <div class="header-bar">
            <div class="title-container" role="button" @click="goHome">
                <div class="logo-img"></div>
                <div>
                    <div class="title">{{title}}</div>
                    <div class="sub-title">{{subTitle}}</div>
                </div>
            </div>
            <div class="tag-button" role="button" @click="toggleTagSelect">Tags</div>
        </div>
        <tag-select class="header-drawer" :show="showTags"></tag-select>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Watch } from "vue-typed";
    import config from "../config";
    import TagSelect from './tag-select.vue';

    @Component({
        components: {
            "tag-select": TagSelect
        }
    })
    export default class Header extends Vue {
        showTags = false;
        
        // on any route change hide the header drawer
        @Watch("$route")
        onRouteChange() {
            this.showTags = false;
        }

        get title() {
            return config.title;
        }

        get subTitle() {
            return config.subTitle;
        }

        goHome(){
            this.$router.push("/");
        }

        toggleTagSelect() {
            this.showTags = !this.showTags;
        }
    }
</script>

