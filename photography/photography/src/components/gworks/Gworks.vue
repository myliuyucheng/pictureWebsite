<template>
    <div class="works-box">
        <div class="close" @click="close"> X</div>
        <div class="works-content">
            <div class="wc-left">
               <img :src="'http://localhost:8085/'+data.url[0]" alt="" @click="handleClick()">
            </div>
            <div class="wc-right">
                <div class="wcr-content">
                    <div class="section user">
                        <img :src="data.author.url|setUrl" alt="">
                        <span>{{data.author.name}}</span>
                    </div>
                    <div class="section">
                        <h2 class="wcr-title">
                            {{data.title}}
                        </h2>
                        <div class="wcr-description">
                            {{data.description}}
                        </div>
                        
                    </div>
                    <div class="section category-box">
                        <div class="category">
                            {{data.category.name}}
                        </div>
                    </div>
                    <div class="section">
                        <div class="liked-box box-data">
                            <div class="liked-title title-data">喜欢数</div>
                            <div class="liked-content content">{{data.liked}}</div>  
                        </div>
                        <div class="box-data liked-icon">
                            <i :class="like ? 'icon-clicks' : 'icon'" @click="liked" ref="liked"></i>
                        </div>
                        <div class="view-box box-data">
                            <div class="view-title title-data">浏览量</div>
                            <div class="view-content content">
                                {{data.views}}
                            </div>
                        </div>
                        
                    </div>
                    <div class="section time-box">
                        <div class="time-content">
                            {{data.time|getDates}}
                        </div>
                    </div>
                    <div class="report-box">
                        <div class="report section" @click="setReport">举报</div>
                    </div>
                    <div class="section comment-box">
                        评论
                        <div class="comment-input">
                            <input type="text" v-model="comment">
                            <div @click="subCom" class="subCom">发表</div>
                        </div>
                        <div v-for="(value,index) in data.comment" :key="index" class="comment">
                            <div class="comment-left">
                                <img :src="value.author.url|setUrl" alt="" style="width:30px;height:30px;border-radius:50%;">
                            </div>
                            <div class="comment-right">
                                <div class="comment-body">
                                    <span class="actor">{{value.author.name}}</span>
                                    <div class="body-text">{{value.comment}}</div>
                                </div>
                                <div class="comment-date">
                                    {{value.time|getDates}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CommentGallary v-if='isShow'
                            :gallaryImgs="data.url"
                            @close="handleClose()"
        ></CommentGallary>
        <ReportBox v-if="reportShow" :id="id" :type="type" @reClose="reClose" @reData="reData"></ReportBox>
    </div>
</template>

<script>
import { getGWorks,setGComment,userLikes,gworksLikes,gRemoveLikes } from "@/api"
import CommentGallary from '@/common/Gallary'
import ReportBox from "@/common/report"


export default {
    data() {
        return {
            data: {},
            comment: "",
            isShow: false,
            like: false,

            id: this.$route.params.id,
            type: "gworks",
            reportShow: false,

        }
    },
     components:{
        CommentGallary,
        ReportBox,
    },
    created(){
        this.queryWorks()
        this.SelfLike()
    },
    filters:{
        getDates(a){
            let value = new Date(a)
            return `${value.getFullYear()}年${value.getMonth()}月${value.getDate()}日 ${value.getHours()}:${value.getMinutes()}`
        },
        setUrl(value){
            console.log(value)
            if (!value){return}
            let url = value.substr(7)
            console.log(url)
            return `http://localhost:8085/${url}`
        }
    },
    methods: {
        handleClick(){
            console.log(this.data.url)
            this.isShow = true
        },
        handleClose(){
            this.isShow = false
        },
        async queryWorks(){
            console.log(this.$route.params.id)
            let data = await getGWorks({_id:this.$route.params.id})
            this.data = data.message
            console.log(this.data)
        },
        async subCom(){
            let data =  await setGComment({comment:this.comment,_id:this.data._id})
            this.comment = ""
            this.data = data
            console.log(data)
        },
        close(){
            this.$router.go(-1)
        },
        setReport(){
            let id = this.data._id
        },


        async SelfLike(){
            let id = this.$route.params.id
            let data = await userLikes()
            if(data.likegworks.some(data=>data._id===id)){
                this.like= true
            }
        },
        async liked(){
            let _id = this.$route.params.id
            let liked = this.$refs.liked
            if(liked.classList.contains("icon")){
                let data = await gworksLikes({_id})
                if(data.code == 0){
                    this.like = true
                }
            }else{
                let data = await gRemoveLikes({_id})
                this.like = false
            }
        },




        // 举报
        async setReport(){
            this.reportShow = true
        },
        reData(data){
            this.reportShow = false
            if(data.code === 0){
                console.log("举报成功")
            }
        },
        reClose(){
            this.reportShow = false
        },
    },
}
</script>

<style lang="less" scope>
.close{
    position: absolute;
    width: 20px;
    right:40px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    background: rgb(255, 254, 254);

}
    .works-box{
        position: fixed;
        background:rgba(192,192,192,0.5);
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index:10;
        padding:40px;
        box-sizing: border-box;
        .works-content{
            width: 100%;
            height: 100%;
            background:#fff;
            .wc-left{
                float:left;
                height: 100%;
                width: calc(100% - 300px);
                background:#fff;
                img{
                    width: 100%;
                    height: 100%;

                }
            }
            .wc-right{
                overflow: auto;
                width: 300px;
                height: 100%;
                box-sizing: border-box;
                // rgb(192, 191, 191)
                border-left:1px solid #ECEDF0;
                .section{
                    border-bottom:1px solid #ECEDF0;
                    box-sizing: border-box;
                    padding:20px;   
                }
                .user{
                    text-align: center;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    span{
                        margin:0px 10px;
                        vertical-align: middle;
                    }
                }
                .category-box{
                    .category{
                        width: 68px;
                        height: 20px;
                        line-height: 20px;
                        border-radius: 100px;
                        background-color: #eaebed;
                        font-size: 12px;
                        color: #525558;
                        text-align: center;
                    }
                }
                .box-data{
                    text-align: center;
                    width: 40%;
                    display: inline-block;
                    .title-data{
                        font-size: 15px;
                    }
                    .content{

                    }
                }
                .liked-icon{
                    width: 35px;
                        height: 35px;
                    .icon{
                        display: block;
                        width: 35px;
                        height: 35px;
                        background: red;
                        background:url("../../assets/image/like.png") no-repeat center/100%;
                        cursor: pointer;
                        filter:drop-shadow(0 0px #FF0000);
                    }
                    .icon-clicks{
                        display: block;
                        width: 35px;
                        height: 35px;
                        background:url("../../assets/image/like-click.png") no-repeat center/100%;
                        cursor: pointer;
                    }
                    .icon:hover{
                        background-image:url("../../assets/image/like-hover.png")
                    }
                }
                .time-box{
                    text-align: center;
                    font-size:13px;
                }
                .report-box{
                    text-align: center;
                    padding:10px;
                    border-bottom:1px solid #eaebed;
                    .report{
                        display: inline-block;
                        border-radius: 5px;
                        padding:5px 10px ;
                        background:#409eff;
                        color:#fff;
                        font-size:13px;
                        cursor: pointer;
                    }
                    .report:hover{
                        background: red;
                    }
                }
                .comment-box{
                    padding:20px;
                    .comment-input{
                        input{
                            overflow: hidden;
                            word-wrap: break-word;
                            height: 16px;
                            position: relative;
                            padding: 10px 30px 10px 10px;
                            line-height: 1.4em;
                            max-height: 75px;
                            font-size: 12px;
                            border: 1px solid #eeeff2;
                            box-sizing: border-box;
                            border-radius: 5%;
                        }
                        .subCom{
                            display: inline-block;
                            background-color:#409eff;
                            color: #fff;
                            font-size:14px;
                            padding:2px;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                    }
                    .comment{
                        overflow: hidden;
                        padding:5px 0px;    
                        .comment-left{
                            float:left;
                            margin-right:10px;
                        }
                        .comment-right{
                            float: left;
                            .comment-body{
                                .actor{
                                    font-size: 15px;
                                    font-weight: 700;
                                    line-height:30px;
                                    color: #525558;
                                }
                                .body-text{
                                    font-size: 13px;
                                    line-height: 1.4em;
                                    font-weight: 400;
                                    color: #525558;
                                }
                            }
                            .comment-date{
                                font-size: 12px;
                                color: #b9c1c7;
                                line-height: 20px;
                            }
                        }
                    }
                }
                .wcr-title{
                    font-size: 16px;
                    line-height: 22px;
                }
                .wcr-description{
                    margin-top: 10px;
                    max-height: 50px;
                    word-wrap: break-word;
                    font-size:13px;
                }
                .view-title{
                    font-size:15px;
                }
                
            }
        }
    }
</style>