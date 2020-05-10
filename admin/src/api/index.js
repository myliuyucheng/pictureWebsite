import axios from "axios"
import store from "@/store/index"
import { getToken } from "@/utils/auth"

const url = "http://localhost:8085/"
axios.interceptors.request.use(function(request){
    request.headers.common['token'] = getToken("token") || ""
    return request;
})
axios.interceptors.response.use(function(response){
    console.log(response.data)
    if(!!response.data.code && response.data.code===403){
        store.dispatch("logout")
        window.location.href = "/login"
    }
    return response.data;

})

// 审核作品列表
export let EWorksList = ()=>{
    return axios.post(url+"eworkslist")
}
// 获取审核作品
export let getEWorks =(obj)=>{
    return axios.post(url+"geteworks",obj)
}
// 设置审核作品通过
export let setWAdopt = (obj)=>{
    return axios.post(url+"setwadopt",obj)
}
// 设置审核作品不通过
export let setWFail = (obj)=>{
    return axios.post(url+"setwfail",obj)
}


// 审核作品集列表
export let EGworksList = ()=>{
    return axios.post(url+"egworkslist")
}
// 获取审核作品集
export let getEGworks =(obj)=>{
    return axios.post(url+"getegworks",obj)
}
// 设置审核作品集通过
export let setGwAdopt = (obj)=>{
    return axios.post(url+"setgwadopt",obj)
}
// 设置审核作品集不通过
export let setGwFail = (obj)=>{
    return axios.post(url+"setgwfail",obj)
}


// 审核文章列表
export let EArticleList = ()=>{
    return axios.post(url+"earticlelist")
}
// 获取审核文章
export let getEArticle = (obj)=>{
    return axios.post(url+"getearticle",obj)
}
// 设置审核文章通过
export let setAAdopt =(obj)=>{
    return axios.post(url+"setaadopt",obj)
}
// 设置审核文章不通过
export let setAFail =(obj)=>{
    return axios.post(url+"setafail",obj)
}


// 登录
export let ELogin = (obj)=>{
    return axios.post(url+"admin/login",obj)
}




// 管理员
export let getUserList = () => {
    return axios.post(url+"admin/userlist")
}
export let getWorksList = () => {
    return axios.post(url+"admin/workslist")
}
export let getGworksList = () => {
    return axios.post(url+"admin/gworkslist")
}
export let getArticleList = () => {
    return axios.post(url+"admin/articlelist")
}
export let getAcategoryList = () => {
    return axios.post(url+"admin/acategorylist")
}
export let getCategoryList = () => {
    return axios.post(url+"admin/categorylist")
}

export let setCategory = (_id,name) => {
    return axios.post(url+"admin/setcategory",{ _id,name })
}
export let setAcategory = (_id,name) => {
    return axios.post(url+"admin/setacategory",{ _id,name })
}

export let getWorks = (_id) => {
    return axios.post(url+"admin/getworks",{ _id })
}
export let getGworks = (_id) => {
    return axios.post(url+"admin/getgworks",{ _id })
}
export let getArticle = (_id) => {
    return axios.post(url+"admin/getarticle",{ _id })
}

export let addCategory = (name) => {
    return axios.post(url+"admin/addcategory",{ name })
}
export let addAcategory = (name) => {
    return axios.post(url+"admin/addacategory",{ name })
}

export let deleCategory = (_id) => {
    return axios.post(url+"admin/delecategory",{ _id })
}
export let deleAcategory = (_id) => {
    return axios.post(url+"admin/deleacategory",{ _id })
}
export let deleUser = (_id) => {
    return axios.post(url+"admin/deleuser",{ _id })
}
export let deleWorks = (_id) => {
    return axios.post(url+"admin/deleworks",{ _id })
}
export let deleGworks = (_id) => {
    return axios.post(url+"admin/delegworks",{ _id })
}
export let deleArticle = (_id) => {
    return axios.post(url+"admin/delearticle",{ _id })
}




// 审查员的举报
export let getRWorksList = () => {
    return axios.post(url+"examiner/report/workslist")
}
export let getRGworksList = () => {
    return axios.post(url+"examiner/report/gworkslist")
}
export let getRArticleList = () => {
    return axios.post(url+"examiner/report/articlelist")
}
export let getRWorks = ( _id ) => {
    return axios.post(url+"examiner/report/getworks",{ _id })
}
export let getRGworks = ( _id ) => {
    return axios.post(url+"examiner/report/getgworks",{ _id })
}
export let getRArticle = ( _id ) => {
    return axios.post(url+"examiner/report/getarticle",{ _id })
}
export let RWorksAdopt = ( _id ) => {
    return axios.post(url+"examiner/report/worksadopt",{ _id })
}
export let RWorksFail = ( _id ) => {
    return axios.post(url+"examiner/report/worksfail",{ _id })
}
export let RGworksAdopt = ( _id ) => {
    return axios.post(url+"examiner/report/gworksadopt",{ _id })
}
export let RGworksFail = ( _id ) => {
    return axios.post(url+"examiner/report/gworksfail",{ _id })
}
export let RArticleAdopt = ( _id ) => {
    return axios.post(url+"examiner/report/articleadopt",{ _id })
}
export let RArticleFail = ( _id ) => {
    return axios.post(url+"examiner/report/articlefail",{ _id })
}