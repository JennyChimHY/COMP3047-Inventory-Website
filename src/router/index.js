import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {  // mapping**
    path: '/inventory',
    name: 'inventory',
    component: () => import(/* webpackChunkName: "inventory" */ '../views/InventoryView.vue') //HomeView
  },

{
  path: '/chart',
  name: 'chart',
  component: () => import(/* webpackChunkName: "about" */ '../components/ChartView.vue')
},

{
  path: '/search',
  name: 'search',
  component: () => import(/* webpackChunkName: "search" */ '../views/SearchView.vue')
},

{
  path: '/books',
  name: 'books',
  component: () => import(/* webpackChunkName: "books" */ '../views/BooksView.vue')
},

{
  path: '/book/detail',
  name: 'bookdetail',
  component: () => import(/* webpackChunkName: "books" */ '../views/BookDetailView.vue')
},

{
  path: '/book/detail/:id/',  //lab07
  name: 'bookdetailEdit',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "books" */ '../views/BookDetailView.vue')
},

{
  path: '/games',
  name: 'games',
  component: () => import(/* webpackChunkName: "games" */ '../views/GamesView.vue')
},

{
  path: '/game/detail',
  name: 'gamedetail',
  component: () => import(/* webpackChunkName: "games" */ '../views/GameDetailView.vue')
},

{
  path: '/game/detail/:id/',  //lab07
  name: 'gamedetailEdit',
  component: () => import(/* webpackChunkName: "games" */ '../views/GameDetailView.vue')
},

{
  path: '/gifts',
  name: 'gifts',
  component: () => import(/* webpackChunkName: "gifts" */ '../views/GiftsView.vue')
},

{
  path: '/gift/detail',
  name: 'giftdetail',
  component: () => import(/* webpackChunkName: "gifts" */ '../views/GiftDetailView.vue')
},

{
  path: '/gift/detail/:id/',  //lab07
  name: 'giftdetailEdit',
  component: () => import(/* webpackChunkName: "gifts" */ '../views/GiftDetailView.vue')
},

{
  path: '/materials',
  name: 'materials',
  component: () => import(/* webpackChunkName: "materials" */ '../views/MaterialsView.vue')
},

{
  path: '/material/detail',
  name: 'materialdetail',
  component: () => import(/* webpackChunkName: "materials" */ '../views/MaterialDetailView.vue')
},

{
  path: '/material/detail/:id/',  //lab07
  name: 'materialdetailEdit',
  component: () => import(/* webpackChunkName: "materials" */ '../views/MaterialDetailView.vue')
},

{
  path: '/users',
  name: 'users',
  component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue')
},

{
  path: '/user/detail',
  name: 'userdetail',
  component: () => import(/* webpackChunkName: "users" */ '../views/UserDetailView.vue')
},

{
  path: '/user/detail/:id/',  //lab07
  name: 'userdetailEdit',
  component: () => import(/* webpackChunkName: "users" */ '../views/UserDetailView.vue')
},

{
  path: '/signin',
  name: 'signin',
  component: () => import(/* webpackChunkName: "signin" */ '../views/SigninView.vue')
},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
