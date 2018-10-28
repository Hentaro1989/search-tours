import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
// import store from './store'
Vue.use(Router)

const extend = (name, page) => ({ name, extends: page })

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: extend('Main', MainPage),
      children: [
        {
          path: 'search',
          name: 'Search',
          component: extend('Search', SearchPage),
          children: []
        }
      ]
    }
  ]
})

// // For Vuex
// router.beforeEach((to, from, next) => {
//   // Reset pageStack to the new route
//   store.commit('navigator/resetStack', to.matched.map(m => m.components.default))
//   next()
// })

export default router
