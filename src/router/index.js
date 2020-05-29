import Vue from 'vue'
import VueRouter from 'vue-router'
import Lesson from '../views/Lesson.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/:lessonName',
    name: 'lesson',    
    component: Lesson,
    props:true
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: "http://localhost:3000/",
  routes
})

export default router
