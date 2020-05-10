
import Report from "@/components/report/Report"
import Rworks from "@/components/report/base/Works"
import RworksList from "@/components/report/base/worksbase/WorksList"
import RWorksBox from "@/components/report/base/worksbase/WorksBox"
import Rgworks from "@/components/report/base/Gworks"
import RgworksList from "@/components/report/base/gworksbase/GworksList"
import RGworksBox from "@/components/report/base/gworksbase/GworksBox"
import Rarticle from "@/components/report/base/Article"
import RarticleList from "@/components/report/base/articlebase/ArticleList"
import RArticleBox from "@/components/report/base/articlebase/ArticleBox"

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
    component: Rworks,
    meta: {
      title: "作品举报审核",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "RworksList",
      component: RworksList,
      },{
      path: ":_id",
      name: "RWorksBox",
      component: RWorksBox,
      meta: {
        title: "作品内容",
        breadcrumb: true
      }
    }]
  },{
    path: 'gworks',
    name: 'Rgworks',
    component: Rgworks,
    meta: {
      title: "作品集举报审核",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "RgworksList",
      component: RgworksList,
      },{
      path: ":_id",
      name: "RGworksBox",
      component: RGworksBox,
      meta: {
        title: "作品集内容",
        breadcrumb: true
      }
    }]
  },{
    path: 'article',
    name: 'Rarticle',
    component: Rarticle,
    meta: {
      title: "文章举报审核",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "RarticleList",
      component: RarticleList,
    },{
      path: ":_id",
      name: "RArticleBox",
      component: RArticleBox,
      meta: {
        title: "文章内容",
        breadcrumb: true
      }
    }]
  }]
}

export default report