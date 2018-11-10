import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../pages/Chat/Chat'
import Login from '../pages/Login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/chat",
      component: Chat
    },
    {
      path: '/',
      redirect: '/chat'
    }
  ]
})
