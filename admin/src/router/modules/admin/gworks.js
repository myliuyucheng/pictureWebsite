// 作品集列表
const gworks = {
    path: "gworkss",
    name: "Gworks",
    component: ()=>import("@/components/gworkss/Gworks"),
    meta: {
      title: "作品集列表",
      breadcrumb: true,
    },
    children: [{
      path: "",
      name: "GworksList",
      component: ()=>import("@/components/gworkss/base/GworksList"),
    },{
      path: ':_id',
      name: 'GworkssBox',
      component: ()=>import("@/components/gworkss/base/GworksBox"),
      meta: {
          title: "作品内容",
          breadcrumb: true
        }
    }]
}


export default gworks