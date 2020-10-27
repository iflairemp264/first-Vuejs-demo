import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import FormInput from '@/components/FormInput';
import TodoList from '@/components/TodoList'
Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: '/form',
        name: 'FormInput',
        component: FormInput
      },
      {
        path: '/todo',
        name: 'TodoList',
        component: TodoList
      }
    ]
  })
