import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import Login from "@/components/login/Login"
import HomeIndex from "@/components/home/base/index"



import Auditor from "./modules/auditors"
import Admin from './modules/admins'


Vue.use(Router)
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   children:[
  //     {
  //       path: '',
  //       name: 'HomeIndex',
  //       component: HomeIndex,
  //       meta: {
  //         title: "首页",
  //         breadcrumb: true
  //       }
  //     },    
  //     Auditor.User,
  //     Auditor.Works,
  //     Auditor.Gworks,
  //     Auditor.Article,
  //     Auditor.Report,
      
  //     Admin.User,
  //     Admin.Works,
  //     Admin.Gworks,
  //     Admin.Article,
  //     Admin.Acategory,
  //     Admin.Category,
  //   ]
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
]
const auditor = [{
  path: '/',
  name: 'Home',
  component: Home,
  component: Home,
  children:[{
      path: '',
      name: 'HomeIndex',
      component: HomeIndex,
      meta: {
          title: "首页",
          breadcrumb: true
      }
  },    
  Auditor.User,
  Auditor.Works,
  Auditor.Gworks,
  Auditor.Article,
  Auditor.Report,
]}]
const admin = [{
  path: '/',
  name: 'Home',
  component: ()=>import('@/components/home/Home'),
  children:[{
          path: '',
          name: 'HomeIndex',
          component: ()=>import("@/components/home/base/index"),
          meta: {
              title: "首页",
              breadcrumb: true
          }
      },    
      Admin.User,
      Admin.Works,
      Admin.Gworks,
      Admin.Article,
      Admin.Acategory,
      Admin.Category,
  ]
}]

const router = new Router({
  routes
})

export { router,routes,admin,auditor }