<template lang="pug">
    .lesson-box
        .lesson-box__content
            .lesson-box__excerpt(v-html='lessonExcerpt') {{lessonExcerpt}}
            .lesson-box__text(v-html='lessonContent') {{lessonContent}}
        .lesson-box__action
            a.lesson-prev(href='javascript:;' v-on:click='prevLesson(currentIndex)') Prev
            a.lesson-next(href='javascript:;' v-on:click='nextLesson(currentIndex)') Next
</template>
<script>
import axios from "@/plugins/axios.js";
import "prismjs/prism";
import "prismjs/themes/prism.css";
export default {
    props: {
        lessonName: String,
        list:Array
    },
    data() {
        return {
            lessonExcerpt: null,
            lessonContent: null,
            lessonCurrent: null,
            lessonData:null,
            domainName: window.siteDomain,
            courseName: window.courseSlug,
            currentIndex:null,
            courseName: "node"
        };
    },
    created: function () {
        this.getLessonData();
    },
    watch: {
        lessonName: function (e) {
            this.getLessonData();
        }
    },
    methods: {
        getLessonData: function () {
            var e = this;
            axios.get(this.courseName + "/lessons/" + this.lessonName).then(res => {
                this.lessonTitle = res.data.title;
                this.lessonExcerpt = res.data.excerpt;
                this.lessonContent = res.data.content;
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
                console.log(nextIndex);
                let nextLesson = this.list[nextIndex].slug;
                console.log("nextLesson",nextLesson);
                this.$router.push(nextLesson);
            }else{
                console.log(false);
            }
        }
    }
}
</script>