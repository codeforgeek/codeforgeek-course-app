<template lang="pug">
    .lesson-box
        .lesson-box__content
            .lesson-box__excerpt(id="lesson-excerpt" v-html='lessonExcerpt' v-highlight) {{lessonExcerpt}}
            template(v-if="lessonVideo")
                vue-plyr
                    .plyr__video-embed
                        iframe(:src="lessonVideo" allowfullscreen allowtransparency allow="autoplay")
            template(v-else)
                .lesson-box__text(id="lesson-text" v-html='lessonContent' v-highlight) {{lessonContent}}
        .lesson-box__action
            a.lesson-prev(href='javascript:;' v-on:click='prevLesson(currentIndex)') Prev
            a.lesson-next(href='javascript:;' v-on:click='nextLesson(currentIndex)') Next
</template>
<script>
import axios from "@/plugins/axios.js";
export default {
    props: {
        lessonName: String,
        list:Array
    },
    data() {
        return {
            lessonExcerpt: null,
            lessonContent: null,
            lessonVideo:null,
            lessonCurrent: null,
            lessonData:null,
            domainName: window.siteDomain,
            courseName: window.courseSlug,
            currentIndex:null,
            courseName:"node"
            // courseName: "rest-api-node-mongodb"
        };
    },
    created: function () {
        this.getLessonData();
        this.interval = setInterval(() => this.trackCourseData(), 10000);
    },
    watch: {
        lessonName: function (e) {
            this.getLessonData();
        }
    },
    methods: {
        trackCourseData: function(){
            let data = {
                courseSlug: this.courseName,
                lessonSlug: this.lessonName,
                isCompleted: false
            }
            axios.post("/user/trackcourse", data).then(res => {});
        },
        getLessonData: function () {
            var e = this;
            axios.get("/api/courses/"+ this.courseName + "/lessons/" + this.lessonName).then(res => {
                console.log("response => ",res);
                this.lessonTitle = res.data.title;
                this.lessonExcerpt = res.data.excerpt;
                this.lessonContent = res.data.content;
                this.lessonVideo = res.data.videoUrl;
                this.currentIndex =res.data.lessonOrder;
            });
        },
        prevLesson: function(item) {
            let lessonIndex = item-1;
            let myList = this.list[lessonIndex].slug;
            if(lessonIndex >= 1 ){
                let prevIndex = lessonIndex-1;
                let prevLesson = this.list[prevIndex].slug;
                this.$router.push(prevLesson);
            }else{
                console.log(false);
            }
        },
        nextLesson: function(item) {
            let lessonIndex = item-1;
            let myList = this.list[lessonIndex].slug;
            let listLength = this.list.length;
            console.log("listLength",listLength);
            console.log("lessonIndex",lessonIndex);
            if(lessonIndex < listLength){
                let nextIndex = lessonIndex+1;
                console.log("next",nextIndex);
                let nextLesson = this.list[nextIndex].slug;
                console.log("nextLesson",nextLesson);
                this.$router.push(nextLesson);
            }else{
                console.log(false);
            }
        }
    },
    // mounted() {
    // //     import("prismjs/themes/prism-tomorrow.css")
    // //   .then(() => import("prismjs").then(p => Prism.highlightAll()))
    //     // console.log("mounted...");
    //     var precode = document.getElementById('lesson-text');
    //     console.log("precode ", precode);
    //     Prism.highlightElement(precode);
    //     console.log('mounted')

    // }
}
</script>