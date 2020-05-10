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
                     <div class="edit-box section">
                        <div class="but" @click="editArticle">编辑</div>
                        <div class="but" @click="removeArticle">删除</div>
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

    </div>
</template>

<script>
import { getArticle,setGraCom,deleteArticle } from "@/api"
export default {
    data(){
        return{
            id:this.$route.params.id,
            data: {},
            comment:"",
        }
    },
    created(){
        this.getArt()
    },
    computed:{
        time(){
            let value = new Date(this.data.time)
            return `${value.getFullYear()}年${value.getMonth()}月${value.getDate()}日 ${value.getHours()}:${value.getMinutes()}`
        }
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


        editArticle(){
            this.$router.push({name:"UpdataArticle",params:{id:this.data._id}})
        },
        async removeArticle(){
            var r=confirm("确定要删除吗？");
            if(r){
                let data = await deleteArticle(this.id)
                if(data.code === 0){
                    this.$router.go(-1)
                    console.log("删除成功")
                }
            }else{
                console.log("取消成功")
            }
        }
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
        }
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
                        text-align: left;
    
                    }
                    .edit-box{
                        .but{
                            cursor: pointer;
                            margin:10px;
                            text-align: center;
                            display: inline-block;
                            padding: 5px 0px;
                            width:35%;
                            color:#fff;
                            border-radius: 5px;
                            background: rgb(61, 156, 245);
                        }
                        .but:hover{
                            
                            background: rgb(51, 129, 202);
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