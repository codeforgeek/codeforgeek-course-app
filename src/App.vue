<template>
  <div class="app" id="app">
    <div class="app__header">
        <div class="app__search">
          <input type="search" v-model="searchQuery" placeholder="Search Lessons..." />
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </div>
        <div class="app__title">
            <h3>{{courseTitle}}</h3>
        </div>
        <div class="app__backlink"><a :href='domainName + "/courses/" + courseName + "/"'>Back to course</a></div>
    </div>
    <div class="app__wrap">
        <div class="app__sidebar">
            <ol class="main-nav">
                <li v-for="(lesson,key) in filteredLessons" >
                  <template v-if="lesson.title">
                    <router-link :to="lesson.slug" class="search-link">{{lesson.title}}</router-link>
                  </template>
                  <template v-else>
                    <Accordion :title="lesson.name">
                      <ul id="nav">
                        <li v-for="item in lesson.lessons">
                          <router-link :to="item.slug" :lessonName="item.slug">{{item.title}}</router-link>
                        </li>
                      </ul>
                    </Accordion>
                  </template>
                </li>
            </ol>
        </div>
        <div class="app__content">
            <router-view :list="searchList"></router-view>
        </div>
    </div>
  </div>
</template>

<script>
  // import { lessonsList } from "@/api/lessons";
  import axios from "@/plugins/axios.js";
  export default{
    data(){
      return{
        searchQuery:"",
        lessonList:null,
        searchList:null,
        firstLesson: null,
        domainName: window.siteDomain,
        courseTitle:null,
        active:false,
        courseName: "node"
        // courseName:"rest-api-node-mongodb"
        // courseName: window.courseSlug
      }
    },
    components: {
      Accordion: require("@/components/Accordion").default
    },
    created(){
      axios.get(`/api/courses/${this.courseName}/lessons`).then(res => {
        console.log(this.courseName);
        console.log(res);
        this.lessonList = res.data.lessonData;
        this.searchList = res.data.trackLessonsData;
        this.courseTitle = res.data.courseData.name;
        this.firstLesson = res.data.lessonData[0].lessons[0].slug;
        var firstSlug = this.$route.path;
        "/" == firstSlug && this.$router.push(this.firstLesson);
        // console.log("firstSlug",firstSlug);
        // if("/" == firstSlug){
        //   console.log("true");
        //   this.$router.push(this.firstLesson);
        // }else{
        //   console.log("false");
        //   this.$router.push(this.firstLesson);
        // }
        // this.$router.push(this.firstLesson);
      });
    },
    computed: {
      filteredLessons: function () {
        var current = this;
        return this.searchQuery
          ? this.searchList.filter(function (data) {
              console.log("search data => ",data);
              return data.title
                .toLowerCase()
                .includes(current.searchQuery.toLowerCase());
            })
          : this.lessonList;
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #0652dd;
    }
  }
}
.search-link{
  padding:10px 20px;
  color:#000;
  display: block;
  text-decoration:none;
  font-size:14px;
  border-bottom:1px solid #dadada;
  &:hover{
    color:#0652dd;
  }
}
</style>
