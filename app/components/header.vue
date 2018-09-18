<style lang="scss">
    @import "../style/_variables.scss";
    .header {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 999;

        .header-bar {
            width: 100%;

            box-sizing: border-box;
            padding: .75rem 1rem;

            background-color: $header-color;
            color: $header-text-color;

            display: flex;
            justify-content: space-between;
            align-items: center;

            transition: all .3s ease;

            .title-container {
                display: flex;
                align-items: center;
                
                cursor: pointer;
            }

            .titles {
                flex-shrink: 2;
            }

            .title {
                display: inline-block;
                font-size: $font-size-xl;
                font-family: $accent-font;
            }

            .sub-title {
                font-size: $font-size-xs;
                letter-spacing: 1px;

                @media (max-width: 450px) {
                    display: none;
                }
            }

            .logo-image {
                margin: -.5rem .5rem -.5rem 0;

                background-image: $logo-image;
                background-repeat: no-repeat;
                background-size: contain;
                height: 4rem;
                width: 4rem;

                @media (max-width: 450px) {
                    height: 3rem;
                    width: 3rem;
                }
                
                transition: all .3s ease;
            }

            .tag-button {
                cursor: pointer;
                font-size: $font-size-sm;
                color: $muted-text-color;
            }
        }

        &.scrolled {
            .header-bar {
                padding: .25rem .5rem;

                transition-delay: .3s;

                .logo-image {
                    margin-left: 0;
                    height: 3rem;
                    width: 3rem;

                    transition-delay: .3s;
                }
            }
        }
    }
</style>

<template>
    <div id="header" class="header" :class="{ 'scrolled': scrolled }">
        <div class="header-bar">
            <div class="title-container" role="button" @click="goHome">
                <div class="logo-image" :title="title"></div>
                <transition name="fade">
                    <div class="titles" v-if="!scrolled">
                        <div class="title">{{title}}</div>
                        <div class="sub-title">{{subTitle}}</div>
                    </div>
                </transition>
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
        scrolled = false;
        
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

        onScroll() {
            this.scrolled = window.scrollY > 25;
        }

        mounted() {
            window.addEventListener("scroll", this.onScroll)
        }
    }
</script>

