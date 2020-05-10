import axios from 'axios'
// 请求拦截器
axios.interceptors.request.use(function(request){
    console.log(request)
    request.headers.common['token'] = window.localStorage.getItem("token") || ""
    return request;
})
// 响应拦截器
axios.interceptors.response.use(function(response){
    if(response.data || response.data.code){
        if(response.data.code == 403){
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("name")
            window.vm.$store.commit("setname","")
            window.vm.$router.push({path:"/login"})
            console.log(window.vm.$store.state.name)
        }
    }
    return response.data;
})
const url = "http://localhost:8085/"

// 登录
export let login = (username,password)=>{
    return axios.post(url+"login",{
        username,
        password,
    })
}
// 注册
export let register = (obj)=>{
    return axios.post(url+"register",obj)
}   

// 作品分类列表
export let getCategory = ()=>{
    return axios.post(url+"works/getcategory")
}
// 文章分类列表
export let getAcategory = ()=>{
    return axios.post(url+"article/getacategory")
}
// 添加作品
export let addWorks = (obj)=>{  
    // 添加请求头
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.post(url+"works/addworks",obj,config)
}
// 添加作品组
export let addGworks = (obj)=>{  
    // 添加请求头
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.post(url+"gworks/addgworks",obj,config)
}
// 添加文章
export let addArticle = (obj)=>{
    return axios.post(url+"article/addArticle",obj)
}

// 作品列表
export let worksList = ()=>{
    return axios.post(url+"works/workslist")
}
// 作品集列表
export let gworksList = ()=>{
    return axios.post(url+"gworks/gworkslist")
}
// 文章列表
export let articleList = ()=>{
    return axios.post(url+"article/articlelist")
}


// 查找自己
// export let getSelf = () => {
//     return axios.post(url+"user/getself")
// }

// 需要作品id
// 用户喜欢作品
// 点击喜欢
// export let usergwLikes = ()=>{
//     return axios.post(url+"user/getgwlikes")
// }
export let userLikes = ()=>{
    return axios.post(url+"user/getlikes")
}
export let worksLikes = (_id)=>{
    return axios.post(url+"works/likes",{_id})
}
export let wRemoveLikes = (obj)=>{
    return axios.post(url+"works/removelikes",obj)
}
export let gworksLikes = (obj)=>{
    return axios.post(url+"gworks/likes",obj)
}
export let gRemoveLikes = ( obj ) => {
    return axios.post(url+"gworks/removelikes",obj)
}
export let articleLikes = ( obj ) => {
    return axios.post(url+"article/likes",obj)
}
export let aRemoveLikes = ( obj ) => {
    return axios.post(url+"article/removelikes",obj)
}


// 获得用户作品
export let getUserWorks = ()=>{
    return axios.post(url+"user/workslist")
}
export let getUserGworks = ()=>{
    return axios.post(url+"user/gworkslist")
}
export let getUserArticle = ()=>{
    return axios.post(url+"user/articlelist")
}



// 作品举报
export let wReport = (_id,comment)=>{
    return axios.post(url+"works/report",{_id,comment})
}
export let gReport = (_id,comment)=>{
    return axios.post(url+"gworks/report",{_id,comment})
}
export let aReport = (_id,comment)=>{
    return axios.post(url+"article/report",{_id,comment})
}



// 关注粉丝
export let getSelfFollow = () => {
    return axios.post(url+"user/selffollow")
}
export let getSelfFans = () => {
    return axios.post(url+"user/selffans")
}
export let getFollow = ( _id ) => {
    return axios.post(url+"user/getfollow",{ _id })
}
export let getFans = ( _id ) => {
    return axios.post(url+"user/getfans",{ _id })
}
export let setFollow = ( _id ) => {
    return axios.post(url+"user/setfollow",{ _id })
}
export let removeFollow = ( _id ) => {
    return axios.post(url+"user/removefollow",{ _id })
}


// 编辑
export let updataWorks = ( obj ) => {
    return axios.post(url+"works/updata",obj)
}
export let updataGworks = ( obj ) => {
    return axios.post(url+"gworks/updata",obj)
}
export let updataArticle = ( obj ) => {
    return axios.post(url+"article/updata",obj)
}
export let deleteWorks = ( _id ) => {
    return axios.post(url+"works/delete",{ _id })
}
export let deleteGworks = ( _id ) => {
    return axios.post(url+"gworks/delete",{ _id })
}
export let deleteArticle = ( _id ) => {
    return axios.post(url+"article/delete",{ _id })
}


// 搜索
export let searchWorks = (title, category) => {
    return axios.post(url+"works/search",{ title,category })
}
export let searchGworks = (title, category) => {
    return axios.post(url+"gworks/search",{ title,category })
}
export let searchArticle = (title, category) => {
    return axios.post(url+"article/search",{ title,category })
}


// 查询作品
export let getWorks = (_id)=>{
    return axios.post(url+"works/getworks",{_id})
}
// 发表评论
export let setComment = (comment)=>{
    return axios.post(url+"works/setcomment",comment)
}
// 获取评论
export let getComment = (_id)=>{
    return axios.post(url+"works/getcomment",{_id})
}


// 查询作品集
export let getGWorks = (obj)=>{
    return axios.post(url+"gworks/getgworks",obj)
}
// 发表评论
export let setGComment = (comment)=>{
    return axios.post(url+"gworks/setcomment",comment)
}



export let userList = ()=>{
    return axios.post(url+"user/userlist")
}




// 轮播
export let swiperImg = ()=>{
    return axios.post(url+"swiper")
}


export let getUserDetails = (obj)=>{
    return axios.post(url+"user/getdetails",obj)
}







// 查询文章
export let getArticle = (_id)=>{
    return axios.post(url+"getarticle",{_id})
}

// 文章评论
export let setGraCom = (obj)=>{
    return axios.post(url+"article/setcomment",obj)
}

// 用户自己信息
export let getUser = ()=>{
    return axios.post(url+"getuser")
}
// 设置用户背景
export let setback =(obj)=>{
    return axios.post(url+"setback",obj)
}




export let getUDworksList = ( _id )=>{
    return axios.post(url+"userdetails/workslist",{_id})
}
export let getUDgworksList = ( _id )=>{
    return axios.post(url+"userdetails/gworkslist",{ _id })
}
export let getUDarticleList = ( _id )=>{
    return axios.post(url+"userdetails/articlelist",{ _id })
}
