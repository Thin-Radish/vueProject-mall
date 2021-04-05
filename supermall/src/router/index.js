import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from 'views/home/Home'
// import Category from 'views/category/Category'
// import Cart from 'views/cart/Cart'
// import Profile from 'views/profile/Profile'

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detial/Detail')

//安装插件
Vue.use(VueRouter)


//创立路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detial/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
