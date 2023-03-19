import Vue from 'vue'
import VueRouter from 'vue-router'
import CoursesView from '../views/CoursesView.vue'
import LessonsView from '../views/LessonsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  },
  {
    path: '/courses/:courseId',
    name: 'lessons',
    component: LessonsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
