import Article from "@/components/article/Article"
import ArticleList from "@/components/article/base/ArticleList"
import ArticleBox from "@/components/article/base/ArticleBox"

const article = {
    path: 'article',
    name: 'Article',
    component: Article,
    meta: {
        title: "文章审核",
        breadcrumb: true,
    },
    children: [{
        path: "",
        name: "ArticleList",
        component: ArticleList,
    },{
        path: ":_id",
        name: "ArticleBox",
        component: ArticleBox,
        meta: {
            title: "文章内容",
            breadcrumb: true,
        }
    }]
}

export default article