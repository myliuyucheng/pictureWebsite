import Vue from 'vue'
import Router from 'vue-router'
// 登录
import Login from "@/components/login/Login"
// 注册
import Register from "@/components/register/Register"
// 添加文章
import AddArticle from "@/components/addArticle/AddArticle"
// 添加作品
import AddWorks from "@/components/addWorks/AddWorks"
// 添加作品组
import AddGworks from "@/components/addgworks/AddGworks"


// 首页
import Home from '@/components/home/Home'
// 摄影技巧
import Skills from "@/components/Skills/Skills"

// 摄影动态
import Discover from "@/components/discover/Discover"
// 作品列表
import WorksList from "@/components/WorksList/WorksList"
// 作品页面
import Works from "@/components/works/Works"  
// 作品集列表
import GWorksList from "@/components/gworkslist/Gworkslist"
// 作品集页面
import GWorks from "@/components/gworks/Gworks"
// 文章列表
import ArticleList from "@/components/articlelist/Articlelist"
// 文章页面
import Article from "@/components/article/Article" 



// 用户界面
import User from "@/components/user/User"
// 用户界面的作品
import UserWorks from "@/components/user/base/UserWorks"
// 用户界面的作品集
import UserGworks from "@/components/user/base/UserGworks"
// 用户界面的文章
import UserArticle from "@/components/user/base/UserArticle"
import UWorks from "@/components/user/base/UWorks"
import UGworks from "@/components/user/base/UGworks"
import UArticle from "@/components/user/base/UArticle"


import UserList from "@/components/userlist/UserList"
import UserDetails from "@/components/userdetails/User"
import UDworksList from "@/components/userdetails/base/UserWorks"
import UDgworksList from "@/components/userdetails/base/UserGworks"
import UDarticleList from "@/components/userdetails/base/UserArticle"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },{
      path: "/addarticle",
      name: "AddArticle",
      component: AddArticle,
    },{
      path: "/addworks",
      name: "AddWorks",
      component: AddWorks,
    },{
      path: "/addgworks",
      name: "AddGworks",
      component: AddGworks,
    },{
      path: "/userlist",
      name: "UserList",
      component: UserList,
    },


    {
      path: '/',
      name: 'Home',
      component: Home,
    },{
      path: "/skills",
      name: "Skills",
      component: Skills,
    },{
      path: "/discover",
      name: "Discover",
      component: Discover,
      children: [
        {
          path: 'works',
          name: 'WorksList',
          component: WorksList,
          children: [{
              path: ':id',
              name: 'Works',
              component: Works,
            }]
        },{
          path: 'gworks',
          name: 'GWorksList',
          component: GWorksList,
          children: [{
            path: ':id',
            name: 'GWorks',
            component: GWorks
          }]
        },{
          path: 'article',
          name: 'ArticleList',
          component: ArticleList,
        }
      ]
    },{
      path: "/article/graphic/:id",
      name: "Article",
      component: Article,
    },
    
    
    
    
    
    
    {
      path: "/userdetails/",
      name: "UserDetails",
      component: UserDetails,
      children: [{
        path: "works/:id",
        name: "UDworksList",
        component: UDworksList,
        children: [{
          path: ":id",
          name: 'UDworks',
          component: Works,
        }]
      },
      
      {
        path: "gworks/:id",
        name: "UDgworksList",
        component: UDgworksList,
        children: [{
          path: ":id",
          name: 'UDgworks',
          component: GWorks,
        }]
      },
      
      
      {
        path: "article/:id",
        name: "UDarticleList",
        component: UDarticleList,
      }]
    },{
      path: "/article/:id",
      name: "UDarticle",
      component: Article,
    },
    
    
    {
      path: "/user",
      name: "User",
      component: User,
      children: [{
        path: "works",
        name: "UserWorks",
        component: UserWorks,
        children: [{
          path: ":id",
          name: 'UWorks',
          component: UWorks,
        }]
      },{
        path: "gworks",
        name: "UserGworks",
        component: UserGworks,
        children: [{
          path: ":id",
          name: 'UGworks',
          component: UGworks,
        }]
      },{
        path: "article",
        name: "UserArticle",
        component: UserArticle,
      }]
    },{
        path: "/user/article/:id",
        name: "UArticle",
        component: UArticle,
    },

    {
      path: "/upworks/:id",
      name: "UpdataWorks",
      component: ()=>import("@/components/updataworks/UpdataWorks")
    },{
      path: "/upgworks/:id",
      name: "UpdataGworks",
      component: ()=>import("@/components/updatagworks/UpdataGworks")
    },{
      path: "/uparticle/:id",
      name: "UpdataArticle",
      component: ()=>import("@/components/updataarticle/UpdataArticle")
    }
  ]
})
