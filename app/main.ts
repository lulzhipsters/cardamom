import Vue from "vue";
import VueRouter from "vue-router";

import * as routeNames from "./constants/routeNames";

import App from "./components/app.vue";
import MultiPostView from "./components/views/multi-post-view.vue";
import SinglePostView from "./components/views/single-post-view.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { name: routeNames.PostById, path: "/posts/id/:postId", component: SinglePostView, props: true },
        { name: routeNames.PostBySlug, path: "/posts/:postSlug", component: SinglePostView, props: true },
        { name: routeNames.Posts, path: "/posts", component: MultiPostView },
        { name: routeNames.PostsWithTag, path: "/posts/tagged/:tag", component: MultiPostView, props: true },
        { name: routeNames.Error, path: "/oops"},
        { path: "*", redirect: "/posts"}
    ]
});

new App({
    el: "#app",
    router: router
})