 // 文章列表
 const article = {
    path: "articles",
    name: "Article",
    component: ()=>import("@/components/articles/Article"),
    meta: {
      title: "文章列表",
      breadcrumb: true,
    },
    children: [{
        path: "",
        name: "ArticleList",
        component: ()=>import("@/components/articles/base/ArticleList"),
    },{
        path: ":_id",
        name: "ArticlesBox",
        component: ()=>import("@/components/articles/base/ArticleBox"),
        meta: {
            title: "文章内容",
            breadcrumb: true,
        }
    }]
}

export default article