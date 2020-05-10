
import Report from "@/components/report/Report"

const report = {
  path: 'report',
  name: 'Report',
  component: Report,
  meta:{
    title: "举报审核",
    breadcrumb: true,
    navmenu: true,
  },
  children: [{
    path: 'works',
    name: 'Rworks',
    component: () => import("@/components/report/base/Works"),
    meta: {
      title: "作品举报审核",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "RworksList",
      component: () => import("@/components/report/base/worksbase/WorksList"),
      },{
      path: ":_id",
      name: "RWorksBox",
      component: () => import("@/components/report/base/worksbase/WorksBox"),
      meta: {
        title: "作品内容",
        breadcrumb: true
      }
    }]
  },{
    path: 'gworks',
    name: 'Rgworks',
    component: () => import("@/components/report/base/Gworks"),
    meta: {
      title: "作品集举报审核",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "RgworksList",
      component: () => import("@/components/report/base/gworksbase/GworksList"),
      },{
      path: ":_id",
      name: "RGworksBox",
      component: () => import("@/components/report/base/gworksbase/GworksBox"),
      meta: {
        title: "作品集内容",
        breadcrumb: true
      }
    }]
  },{
    path: 'article',
    name: 'Rarticle',
    component: () => import("@/components/report/base/Article"),
    meta: {
      title: "文章举报审核",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "RarticleList",
      component: () => import("@/components/report/base/articlebase/ArticleList"),
    },{
      path: ":_id",
      name: "RArticleBox",
      component: () => import("@/components/report/base/articlebase/ArticleBox"),
      meta: {
        title: "文章内容",
        breadcrumb: true
      }
    }]
  }]
}

export default report