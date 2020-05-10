<template>
    <div class="art-list">
        <div class="search-box">
            <input class="search-title" type="text" v-model="searchTitle">
            <select name="" id="" v-model="category">
                <option value="">未分类</option>
                <option v-for="(value,index) in categoryArray" :key="index" :value="value._id">{{value.name}}</option>
            </select>
            <button class="search-but" @click="search">搜索</button>
        </div> 


        <div class="article-box">
            <div class="art-box" v-for="(value,index) in data" :key="index" @click="artContent(index)">
                <!-- <div class="art-left"><img src="" alt=""></div> -->
                <div class="art-right">
                    <div class="title pad">{{value.title}}</div>
                        <div class="author">
                            <!-- <img :src="value.author.url|getUrl" alt=""> -->
                            {{value.author.name}}
                        </div>
                    <div class="tag pad"><span>{{value.category.name}}</span></div>
                    <div class="decscription pad">{{value.description}}</div>
                    <div class="bot-con pad">
                        <div class="bot-con-right">
                            <span class="time">{{value.time|setDate}}</span>
                            <span class="views">浏览量：{{value.views}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { articleList,getAcategory,searchArticle } from "@/api"
export default {
    data(){
        return{
            data: [],

            categoryArray: [],
            category: "",
            searchTitle: "",
        }
    },
    filters:{
        // getUrl(value){
        //     return `http://localhost:8085/${value.substr(7)}`
        // },
        setDate(value){
            let date = new Date(value)
            return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
        }
    },
    created(){
        this.getDate()
        this.acategoryList()
    },
    methods: {
        async getDate(){
            let data = await articleList()
            console.log(data)
            this.data = data.message
        },
        artContent(index){
            this.$router.push({
                name:"Article",
                params:{
                    id:this.data[index]._id
                }
            })
        },



        async acategoryList(){
            let data = await getAcategory()
            this.categoryArray = data
        },
        async search(){
            let data = await searchArticle(this.searchTitle,this.category)
            console.log(data.message)
            this.data = data.message
        },
    }
}
</script>

<style lang="less" scope>
.pad{
    padding:5px;
}
.article-list{
    height: 100%;

}
    .art-list{
        .search-box{
            // height: 60px;
            padding:10px 0px;
            background:#fff;
            border-bottom:1px solid #eee;
            text-align: center;
            .search-title{
                line-height: 20px;
            }
            select{
                height: 25px;
            }
            .search-but{
                height: 25px;
                width: 50px;
                border: 1px solid transparent;  //自定义边框
                outline: none;  
                background: rgb(64,158,255);
                border-radius: 5px;
                color:#fff;
                cursor: pointer;
            }
            .search-but:hover{
                background: rgb(64,158,200);
            }
        }
        .article-box{
            .art-box{
                // margin-bottom:10px;
                overflow: hidden;
                background:#fff;
                width: 80%;
                margin:10px auto;
                .art-left{
                    float:left;
                    width: 150px;
                    height: 150px;
                    background:red;
                    margin-right:30px;
                }
                .art-right{
                    overflow: hidden;
                    box-sizing: border-box;
                    padding:5px 10px;
                    text-align: center;
                    // width: 70%;
                    // margin:auto;
                    .title{
                        font-size:25px;
                        font-weight: bold;
                    }
                    .decscription{
                        font-size:14px;
                    }
                    .tag{
                        text-align: center;
                        span{
                            display: inline-block;
                            width: 68px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            height: 20px;
                            line-height: 20px;
                            border-radius: 100px;
                            background-color: #eaebed;
                            font-size: 12px;
                            color: #525558;
                            text-align: center;
                        }
                    }
                        .author{
                            // float:left;
                           font-size: 12px;
                            line-height: 30px;
                            img{
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                            }
                        }
                    .bot-con{
                        overflow: hidden;
                        .bot-con-right{
                            // float:right;
                            font-size:13px;
                            color:#eee;
                            .views{

                            }
                            .time{

                            }
                        }
                    }
                }
            }
        }
    }
</style>