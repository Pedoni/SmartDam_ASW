import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
   {
    path: '/',
    redirect: {
        name: "login"
    }
  },
  {
      path: "/login",
      name: "login",
      component: LoginView
  },
  {
      path: "/home",
      name: "home",
      component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
