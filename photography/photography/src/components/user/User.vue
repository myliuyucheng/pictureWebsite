<template>
    <div class="profile">
        <div class="user-box">
            <div class="profile-header">
                <div class="pro-head-top">
                    <img :src="data.profileurl|getbackurl" alt="">
                    <div class="back-box">
                        <input type="file" value="设置背景" class="touxiang" ref="fils" @change="backimg">
                        <div class="back-btn">设置背景</div>
                    </div>
                </div>
                <div class="pro-head-middle">
                    <img :src="data.url|geturl" alt="">
                </div>
                <div class="pro-head-bot">
                    <div class="bot-name">{{data.name}}</div>
                    <div class="bot-des">
                        <span>被浏览数{{data.views}}</span>
                        <div @click="follow">关注{{data.follow.length}}</div>
                        <div @click="fans">粉丝{{data.fans.length}}</div>
                    </div>
                    
                </div>
            </div>
            <div class="profile-nav">
                    <ul>
                        <!-- <li><router-link to="/user/works">全部</router-link></li> -->
                        <li><router-link to="/user/works">作品</router-link></li>
                        <li><router-link to="/user/gworks">作品集</router-link></li>
                        <li><router-link to="/user/article">文章</router-link></li>
                        <li><router-link to="/user/like">用户喜欢</router-link></li>
                    </ul>
            </div>
            
            <router-view></router-view>
        </div>
        <Follow v-if="followShow" :data="followData"  @followClose="followClose"></Follow>
        <Fans v-if="fansShow" :data="fansData"  @fansClose="fansClose"></Fans>
    </div>
</template>

<script>
import { getUser,setback,getSelfFollow,getSelfFans } from "@/api"
import Follow from "@/common/Follow"
import Fans from "@/common/Fans"
import userWorks from "./base/UserWorks"


export default {
    components:{
        userWorks,
        Follow,
         Fans,
    },
    filters:{
        geturl(value){
            return `http://localhost:8085/${value.substr(7)}`
        },
        getbackurl(value){
            return `http://localhost:8085/${value}`
        },
    },
    data(){
        return{
            data: {},
            backurl: new FormData(),
            filesize: 10,

            followData: [],
            followShow: false,
            fansData: [],
            fansShow: false,
        }
    },
    created(){
        this.getSelf()
    },
    methods:{
        async getSelf(){
            let data = await getUser()
            this.data = data
            console.log(data)
        },
        async backimg(e){
            let file = this.$refs.fils.files[0]
            let type = file.type
            const read = new FileReader()
            read.readAsDataURL(file)
            let tag = e.currentTarget
            console.log("正在验证文件类型...")
            if(/image/.test(type)){
                console.log("文件类型通过")
                console.log("正在验证文件大小...")
                if(file.size / 1024 / 1024 <= this.filesize){
                    if(this.backurl.getAll("file")[0]){
                        this.backurl.delete("file")
                    }
                    this.backurl.append("file",file, file.name)
                    console.log(this.backurl.getAll("file")[0])
                    let data = await setback(this.backurl)
                    this.data = data
                    console.log(data)
                }else{
                    console.log("文件大小错误")
                }
            }else{
                console.log("文件类型错误")
            }
        },


        async follow(){
            let data = await getSelfFollow()
            console.log(data.message)
            this.followData = data.message
            this.followShow = true
        },
        async followClose (){
            let data = await getUser()
            this.data = data
            this.followShow = false
        },


        async fans(){
            let data = await getSelfFans()
            this.fansData = data.message
            this.fansShow = true
        },
        async fansClose (){
            let data = await getUser()
            this.data = data
            this.fansShow = false
        },
    }
}
</script>

<style lang="less" scope>

    .profile{
        .user-box{
            .profile-header{
                height: 550px;
                // background-color:red;
                .pro-head-top{
                    height: 400px;
                    // background: #FFDEAD;
                    position: relative;
                    overflow: hidden;
                    img{
                        position: relative;
                        width: 100%;
                        // height: 100%;
                    }
                    .back-box{
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        width: 100px;
                        height: 35px;
                        overflow: hidden;
                        text-align: center;
                        border-radius: 5px;
                        font-size: 14px;
                        cursor: pointer;
                        .back-btn{
                            line-height: 35px;
                            background: rgba(0, 0, 0, 0.5);
                            cursor: pointer;
                            width: 100%;
                            height: 100%;
                            color: #fff;
                        }
                        .touxiang{
                            position: absolute;
                            opacity: 0;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            z-index: 5;
                            cursor: pointer;
                        }
                    }
                }
                .pro-head-middle{
                    height: 100px;
                    width: 100px;
                    position: absolute;
                    left: 50%;
                    margin-left:-50px;
                    margin-top:-50px;
                    border-radius: 50%;
                    // background: cadetblue;
                    overflow: hidden;
                    img{
                        width: 100%;
                        // height: 100%;
                    }
                }
                .pro-head-bot{
                    box-sizing: border-box;
                    height: 150px;
                    padding-top: 50px;
                    text-align: center;
                    // background: chartreuse;
                    .bot-name{
                        font-size:20px;
                        margin:10px 0px;
                    }
                    .bot-des{
                        span{
                            font-size:14px;
                        }
                    }
                }
            }
            .profile-nav{
                // background: cadetblue;
                border:1px solid #EEEFF2;
                // overflow: hidden;
                ul{
                    text-align: center;
                    li{
                        display: inline;
                        margin: 10px;   
                        a{
                            display: inline-block;
                            padding:15px 10px;
                            border-bottom:2px solid transparent;
                        }
                        a:hover{
                            border-bottom:2px solid red;
    
                        }
                        .router-link-exact-active{
                            border-bottom:2px solid red;
                        }
                    }
                }
            }
            .profile-body{

            }
        }
    }
</style>