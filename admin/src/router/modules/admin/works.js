// 作品列表
const works = {
    path: 'workss',
    name: "Works",
    component: ()=>import("@/components/workss/Works"),
    meta: {
      title: "作品列表",
      breadcrumb: true,   
    },
    children: [{
      path: "",
      name: "WorksList",
      component: ()=>import("@/components/workss/base/WorksList"),
    },{
      path: ':_id',
      name: 'WorkssBox',
      component: ()=>import("@/components/workss/base/WorksBox"),
      meta: {
          title: "作品内容",
          breadcrumb: true
        }
  }]
}

export default works