const acategory = {
    path: "acategory",
    name: "Acategory",
    component: ()=>import("@/components/acategory/Acategory"),
    meta: {
        title: "文章分类管理",
        breadcrumb: true,
    },
    children: [{
        path: "",
        name: "AcategoryList",
        component: ()=>import("@/components/acategory/base/AcategoryList"),

    }]

}

export default acategory