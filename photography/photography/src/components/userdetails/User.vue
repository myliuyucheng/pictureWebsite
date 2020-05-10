<template>
    <div class="profile">
        <div class="user-box">
            <div class="profile-header">
                <div class="pro-head-top">
                    <img :src="data.profileurl|getbackurl" alt="">
                </div>
                <div class="pro-head-middle">
                    <img :src="data.url|geturl" alt="">
                </div>
                <div class="pro-head-bot">
                    <div class="bot-name">{{data.name}}</div>
                    <div class="bot-des">
                        <span>被浏览数{{data.views}}</span>
                        <span @click="follows">关注{{data.follow.length}}</span>
                        <span @click="fans">粉丝{{data.fans.length}}</span>
                    </div>
                    <div class="de-follow-box">
                        <div @click="clickFollow" class="details-follow"><span v-if="follow">关注</span><span v-if="!follow" @mouseenter="followEnter" @mouseleave="followLeave">已关注</span></div>
                    </div>
                </div>
            </div>
            <div class="ud-profile-nav">
                    <ul>  
                        <li @click="toWorks" class="router-link-exact-active" ref="works">作品</li>
                        <li @click="toGworks" ref="gworks">作品集</li>
                        <li @click="toAticle" ref="article">文章</li>
                    </ul>
            </div>
            <router-view></router-view>
        </div>
        <Follows v-if="followShow" :id="id"  @followClose="followClose"></Follows>
        <Fanss v-if="fansShow" :id="id"  @fansClose="fansClose"></Fanss>
    </div>
</template>

<script>
import { getUserDetails,setback,setFollow,getSelfFollow,removeFollow } from "@/api"
import userWorks from "./base/UserWorks"
import Follows from "@/common/Follows"
import Fanss from "@/common/Fanss"


export default {
    components:{
        userWorks,
        Follows,
        Fanss,
    },
    filters:{
        geturl(value){
            let url = value.substr(7)
            return `http://localhost:8085/${url}`
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

            id: this.$route.params.id,

            follow: true,
            followShow: false,
            fansShow: false,
        }
    },
    created(){
        this.getSelf()
        this.isFollow()
    },
    methods:{
        async getSelf(){
            let data = await getUserDetails({_id:this.$route.params.id})
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
        toWorks(){
            this.$refs.works.classList.add("router-link-exact-active")
            this.$refs.gworks.classList.remove("router-link-exact-active")
            this.$refs.article.classList.remove("router-link-exact-active")
            this.$router.push({name:"UDworksList",params:{id:this.$route.params.id}})
        },
        toGworks(){
            this.$refs.gworks.classList.add("router-link-exact-active")
            this.$refs.works.classList.remove("router-link-exact-active")
            this.$refs.article.classList.remove("router-link-exact-active")
            this.$router.push({name:"UDgworksList",params:{id:this.$route.params.id}})
        },
        toAticle(){
            this.$refs.article.classList.add("router-link-exact-active")
            this.$refs.gworks.classList.remove("router-link-exact-active")
            this.$refs.works.classList.remove("router-link-exact-active")
            this.$router.push({name:"UDarticleList",params:{id:this.$route.params.id}})

        },



        async isFollow(){
            let data = await getSelfFollow()
            if(data.message.length !== 0){
                if(data.message.some(data=>data.user._id === this.id)){
                    this.follow = false
                }
            }
        },
        async clickFollow(){
            let data
            if(this.follow){
                data = await setFollow(this.id)
            }else{
                data = await removeFollow(this.id)
            }
            if(data.code === 0){
                this.follow = !this.follow
            }
        },
        followEnter(e){
            e.target.innerText="取消关注"
        },
        followLeave(e){
            e.target.innerText="已关注"
        },



        async follows(){
            this.followShow = true
        },
        async followClose (){
            this.followShow = false
        },



        async fans(){
            this.fansShow = true
        },
        async fansClose (){
            // let data = await getUser()
            // this.data = data
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
                        top: 0;
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
                    position: relative;
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
                    .de-follow-box{
                        position: absolute;
                        top: 0;
                        right: 0;
                        padding:20px;
                        .details-follow{
                            display: inline-block;
                            padding:5px 20px;
                            background:rgb(61, 156, 245);
                            border-radius: 5px;
                            width: 120px;
                            color:#fff;
                            cursor: pointer;
                            box-sizing: border-box;
                        }
                        .details-follow:hover{
                            background:rgb(51, 129, 202);
                        }
                    }
                }
            }
            .ud-profile-nav{
                border:1px solid #EEEFF2;
                ul{
                    text-align: center;
                    li{ 
                        display: inline-block;
                        padding:15px 10px;
                        border-bottom:2px solid transparent;
                        cursor: pointer;
                    }
                    li:hover{
                        border-bottom:2px solid red;
                    }
                    .router-link-exact-active{
                        border-bottom:2px solid red;
                    }
                }
            }
            .profile-body{

            }
        }
    }
</style>