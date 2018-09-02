<template>
    <div class="when-display">
        {{displayText}}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from "vue-typed";

    @Component()
    export default class WhenDisplay extends Vue {
        @Prop()
        date: number;

        currentDate: number = 0;

        mounted() {
            this.currentDate = Date.now();
            
            //only up date this per minute
            setTimeout(() => { this.currentDate = Date.now() }, 60000)
        }

        get displayText() {
            if(this.date == null){
                return "";
            }

            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;

            var elapsed = this.currentDate - this.date;

            if (elapsed < msPerMinute) {
                return "less than a minute ago";   
            }

            else if (elapsed < (msPerMinute * 2)){
                return "about a minute ago";
            }

            else if (elapsed < msPerHour) {
                return Math.round(elapsed/msPerMinute) + ' minutes ago';   
            }

            else if (elapsed < (msPerHour * 2)) {
                return "about an hour ago";
            }

            else if (elapsed < msPerDay ) {
                return Math.round(elapsed/msPerHour ) + ' hours ago';   
            }

            else if (elapsed < msPerMonth) {
                return Math.round(elapsed/msPerDay) + ' days ago';   
            }

            const dateOptions = {
                day: "numeric",
                month: "short"
            };

            if(elapsed > msPerYear){
                (<any>dateOptions).year = "numeric";
            }

            return new Date(this.date)
                .toLocaleDateString(navigator.language, dateOptions);

            // else if (elapsed < msPerYear) {
            //     return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
            // }

            // else {
            //     return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
            // }            
        }
    }
</script>
