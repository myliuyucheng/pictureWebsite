const category = {
    path: "category",
    name: "Category",
    component: ()=>import("@/components/category/Category"),
    meta: {
        title: "作品分类管理",
        breadcrumb: true,
    },
    children: [{
        path: "",
        name: "CategoryList",
        component: ()=>import("@/components/category/base/CategoryList"),
    }]
}

export default category