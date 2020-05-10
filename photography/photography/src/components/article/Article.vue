<template>
    <div class="graphic">
        <div class="graphic-box">
            <div class="gra-head-box">
                <div class="graphic-head box-width">
                    <div class="top-content gra-des-box">
                        <div class="graphic-title">{{data.title}}</div>
                    </div>
                    <div class="graphic-author gra-des-box">
                        {{data.author.name}}
                    </div>
                    <div class="graphic-tag gra-des-box">
                        {{data.category.name}}
                    </div>
                    <div class="graphic-data gra-des-box">
                        浏览量：{{data.views}}  |  {{time}}
                    </div>
                    <div class="graphic-des gra-des-box">
                        {{data.description}}
                    </div>
                    <div class="reli-box">
                        <div class="report" @click="setReport">举报</div>
                        <div class="liked-icon">
                            <i :class="like ? 'icon-clicks' : 'icon'" @click="liked" ref="liked"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gra-content box-width" v-html="data.content">
            </div>
            <div class="gra-comment-box">
                <div class=" box-width">
                    <div class="gra-com-user">
                        <div>发表评论</div>
                        <input type="text" v-model="comment">
                        <div @click="setCom" class="gra-com-but">发表</div>
                    </div>
                    <div v-for="(value,index) in data.comment" :key="index" class="comment">
                        <div class="comment-left">
                            <img :src="value.author.url|setUrl" alt="">
                            <span class="actor">{{value.author.name}}</span>
                        </div>
                        <div class="comment-right">
                            <div class="comment-body">
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
        <GoTop></GoTop>
        <ReportBox v-if="reportShow" :id="id" :type="type" @reClose="reClose" @reData="reData"></ReportBox>
    </div>
</template>

<script>
import { getArticle,setGraCom,userLikes,articleLikes,aRemoveLikes } from "@/api"
import ReportBox from "@/common/report"
import GoTop from "@/common/goTop"

export default {
    data(){
        return{
            data: {},
            comment:"",

            like: false,

            id: this.$route.params.id,
            type: "article",
            reportShow: false,
        }
    },
    created(){
        this.getArt()
        this.SelfLike()
    },
    computed:{
        time(){
            let value = new Date(this.data.time)
            return `${value.getFullYear()}年${value.getMonth()}月${value.getDate()}日 ${value.getHours()}:${value.getMinutes()}`
        }
    },
    components:{
        ReportBox,
        GoTop,
    },
    methods: {
        async getArt(){
            let data = await getArticle(this.$route.params.id)
            console.log(data)
            this.data = data.message
        },
        async setCom(){
            console.log(this.data._id)
            let data =  await setGraCom({comment:this.comment,_id:this.data._id})
            this.comment = ""
            this.data = data
        },


        async SelfLike(){
            let id = this.$route.params.id
            let data = await userLikes()
            if(data.likearticle.some(data=>data._id===id)){
                this.like= true
            }
        },
        async liked(){
            let _id = this.$route.params.id
            let liked = this.$refs.liked
            if(liked.classList.contains("icon")){
                let data = await articleLikes({_id})
                if(data.code == 0){
                    this.like = true
                }
            }else{
                let data = await aRemoveLikes({_id})
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
    filters:{
        getDates(a){
            let value = new Date(a)
            return `${value.getFullYear()}年${value.getMonth()}月${value.getDate()}日 ${value.getHours()}:${value.getMinutes()}`
        },
        setUrl(value){
            console.log(value)
            if (!value){return}
            let url = value.substr(7)
            return `http://localhost:8085/${url}`
        },
    },
}
</script>

<style lang="less" scope>
.gra-des-box{
    margin-bottom: 10px;
}
.box-width{
    width: 600px;
    margin:auto;
}
  .graphic{
        background-color: #f7f8fa;
        .graphic-box{
            margin:auto;
            .gra-head-box{
                padding:20px 0px;
                background:#fff;
                border-bottom:1px solid #EEEFF2;
                .graphic-head{
                    text-align: center;
                    .top-content{
                        font-size:22px;
                    }
                    .graphic-author{
                        font-size:16px;
                        color:#525558;
                    }
                    .graphic-tag{
                        display: inline-block;
                        width: 70px;
                        height: 20px;
                        font-size: 12px;
                        line-height: 20px;
                        background-color: #eaebed;
                        border-radius: 10px;
                    }
                    .graphic-data{
                        font-size:12px;
                    }
                    .graphic-des{
                        padding:10px 0px;
                        font-size:13px;
                        text-align: left
                    }
                    .reli-box{
                        overflow: hidden;
                        .report{
                            float: left;
                        }
                        .liked-icon{
                            float:right;
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
                    }
                }
            }
            .gra-content{
                padding: 20px 0px;
                font-family: "Helvetica Neue",HelveticaNeue,Helvetica,TeXGyreHeros,FreeSans,"Nimbus Sans L","Liberation Sans","Microsoft YaHei",Arial,sans-serif;
                font-size: 15px;
            }
            .gra-comment-box{
                border-top:1px solid #EEEFF2;
                background:#fff;
                .gra-com-user{
                    div:nth-child(1){
                        font-size:15px;
                    }
                    input[type="text"]{
                        font-size:16px;
                        height: 20px;
                    }
                    .gra-com-but{
                        display: inline-block;
                        font-size:14px;
                        // border:1px solid red;
                        background: #409eff;
                        color:#fff;
                        padding:5px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .gra-com-but:hover{
                        background: #086ca2;
                    }
                }
                .comment{
                    padding:10px 0px;
                    border-bottom: 1px solid #409eff;
                    .comment-left{
                        margin-bottom:10px;
                        img{
                            height: 30px;
                            width: 30px;
                            border-radius: 50%;
                            overflow: hidden;
                        }
                    }
                    .comment-right{
                        .comment-body{
                            .actor{
                                font-size:14px;
                            }
                        }
                        .comment-date{
                            margin-top:10px;
                            font-size: 13px;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
</style>