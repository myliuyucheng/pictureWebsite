const Router = require("koa-router")
const router = new Router

// var  fs=  require('fs')
// 拦截器
const intercept = require("../utils/intercept")


const user = require("../control/user")     //用户
const swiper = require("../control/swiper")     //轮播
const category = require("../control/category") //作品分类
const works = require("../control/works")       //作品
const gworks = require("../control/gworks")     //作品组
const acategory = require("../control/aCategory")//文章分类
const article = require("../control/Article")   //文章
const photo = require("../control/photo")       //富文本照片处理
const tCategory = require("../control/tCategory")       //技术文章分类
const tArticle = require("../control/tArticle")     //技术文章

const worksUrl = "/works/"
const gworksUrl = "/gworks/"
const articleUrl = "/article/"
const userUrl = "/user/"
// 拦截器
router.use(intercept)
router.get("/",(ctx,next)=>{})
// 轮播列表
router.post("/swiper",swiper.SwiperList)
// 用户登录路由
router.post("/login",user.login)
// 用户注册路由
router.post("/register",user.register)

// 文章图片转url路由
router.post("/upload",photo.upPhoto)
// 作品分类列表
router.post(worksUrl+"getcategory",category.CategoryList)
// 文章分类列表
router.post(articleUrl+"getacategory",acategory.acategoryList)
// 添加作品
router.post(worksUrl+"addworks",works.addWorks)
// 添加作品组
router.post(gworksUrl+"addgworks",gworks.addGworks)
// 添加文章
router.post(articleUrl+"addArticle",article.addArticle)

// 作品列表
router.post(worksUrl+"workslist",works.worksList)
// 作品集列表
router.post(gworksUrl+"gworkslist",gworks.gworksList)
// 文章列表
router.post(articleUrl+"articlelist",article.articleList)


// 喜欢
router.post("/user/getlikes",user.getLikes)
router.post(worksUrl+"likes",works.worksLikes)
router.post(worksUrl+"removelikes",works.wRemoveLikes)
router.post(gworksUrl+"likes",gworks.gworksLikes)
router.post(gworksUrl+"removelikes",gworks.gRemoveLikes)
router.post(articleUrl+"likes",article.articleLikes)
router.post(articleUrl+"removelikes",article.aRemoveLikes)

// 摄影师界面
router.post(userUrl+"userlist",user.userList)
router.post(userUrl+"getdetails",user.getDetails)
router.post("/userdetails/workslist",works.getUDworksList)
router.post("/userdetails/gworkslist",gworks.getUDgworksList)
router.post("/userdetails/articlelist",article.getUDarticleList)

// 关注/粉丝
router.post(userUrl+"selffollow",user.getSelfFollow)
router.post(userUrl+"selffans",user.getSelfFans)
router.post(userUrl+"getfollow",user.getFollow)
router.post(userUrl+"getfans",user.getFans)
router.post(userUrl+"setfollow",user.setFollow)
router.post(userUrl+"removefollow",user.removeFollow)

// 编辑
router.post(worksUrl+"updata",works.updataWorks)
router.post(gworksUrl+"updata",gworks.updataGworks)
router.post(articleUrl+"updata",article.updataArticle)
router.post(worksUrl+"delete",works.delete)
router.post(gworksUrl+"delete",gworks.delete)
router.post(articleUrl+"delete",article.delete)


// 搜索
router.post(worksUrl+"search",works.searchWorks)
router.post(gworksUrl+"search",gworks.searchGworks)
router.post(articleUrl+"search",article.searchArticle)


// 发表评论
router.post(worksUrl+"setcomment",works.setComment)

// 查找作品
router.post(worksUrl+"getworks",works.getWorks)
// 评论列表
router.post(worksUrl+"getcomment",works.getComment)
// 作品举报
router.post(worksUrl+"report",works.report)
router.post(gworksUrl+"report",gworks.report)
router.post(articleUrl+"report",article.report)

// 查找作品集
router.post(gworksUrl+"getgworks",gworks.getGWorks)
// 发表评论
router.post(gworksUrl+"setcomment",gworks.setComment)

// 查找文章
router.post("/getarticle",article.getArticle)
// 发表文章评论
router.post("/article/setcomment",article.setComment)





// 技巧文章分类
router.get("/tcategorys",tCategory.TipsCategoryList)
// 技巧文章
router.get("/tarticles",tArticle.TipsArticleList)
// 用户列表
router.get("/users",user.userList)
// 查找自己
router.post("/getuser",user.getUser)
// 设置背景
router.post("/setback",user.setback)

// 自己空间
router.post("/user/workslist",works.getUserWorks)
router.post("/user/gworkslist",gworks.getUserGworks)
router.post("/user/articlelist",article.getUserArticle)


// router.post(userUrl+"getself",user.getSelf)

const adminUrl = "/admin/"
// 审核作品列表
router.post("/eworkslist",works.EWorksList)
// 审核作品
router.post("/geteworks",works.getEWorks)
// 设置审核作品同意
router.post("/setwadopt",works.setWAdopt)
// 设置审核作品不通过
router.post("/setwfail",works.setWFail)

// 审核作品集列表
router.post("/egworkslist",gworks.EGworksList)
// 审核作品集
router.post("/getegworks",gworks.getEGworks)
// 设置审核作品集同意
router.post("/setgwadopt",gworks.setGwAdopt)
// 设置审核作品集不通过
router.post("/setgwfail",gworks.setGwFail)

// 审核文章列表
router.post("/earticlelist",article.EArticleList)
// 审核文章
router.post("/getearticle",article.getEArticle)
// 设置审核文章同意
router.post("/setaadopt",article.setAAdopt)
// 设置审核文章不通过
router.post("/setafail",article.setAFail)

// 审核登录
router.post(adminUrl+"login",user.ELogin)



router.post(adminUrl+"userlist",user.getUserList)
router.post(adminUrl+"workslist",works.getWorksList)
router.post(adminUrl+"gworkslist",gworks.getGworksList)
router.post(adminUrl+"articlelist",article.getArticleList)
router.post(adminUrl+"acategorylist",acategory.getAcategoryList)
router.post(adminUrl+"categorylist",category.getCategoryList)

router.post(adminUrl+"setcategory",category.setCategory)
router.post(adminUrl+"setAcategory",acategory.setAcategory)

router.post(adminUrl+"getworks",works.getWorksA)
router.post(adminUrl+"getgworks",gworks.getGworksA)
router.post(adminUrl+"getarticle",article.getArticleA)

router.post(adminUrl+"addcategory",category.addCategory)
router.post(adminUrl+"addacategory",acategory.addAcategory)

router.post(adminUrl+"delecategory",category.deleCategory)
router.post(adminUrl+"deleacategory",acategory.deleAcategory)
router.post(adminUrl+"deleuser",user.deleUser)
router.post(adminUrl+"deleworks",works.deleWorks)
router.post(adminUrl+"delegworks",gworks.deleGworks)
router.post(adminUrl+"delearticle",article.deleArticle)


const examinerUrl = "/examiner"
const reportUrl = "/examiner/report/"
// 审查员的举报
router.post(reportUrl+"workslist",works.getRWorksList)
router.post(reportUrl+"gworkslist",gworks.getRGworksList)
router.post(reportUrl+"articlelist",article.getRArticleList)
router.post(reportUrl+"getworks",works.getRWorks)
router.post(reportUrl+"getgworks",gworks.getRGworks)
router.post(reportUrl+"getarticle",article.getRArticle)
router.post(reportUrl+"worksadopt",works.RWorksAdopt)
router.post(reportUrl+"worksfail",works.RWorksFail)
router.post(reportUrl+"gworksadopt",gworks.RGworksAdopt)
router.post(reportUrl+"gworksfail",gworks.RGworksFail)
router.post(reportUrl+"articleadopt",article.RArticleAdopt)
router.post(reportUrl+"articlefail",article.RArticleFail)

module.exports = router