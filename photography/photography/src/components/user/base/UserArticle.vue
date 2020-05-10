<template>
    <div class="user-article">
        <div class="ua-list">
            <div class="ua-box" v-for="(value,index) in data" :key="index" @click="article(index)">
                <div class="ua-title">{{value.title}}</div>
                <div class="ua-category">{{value.category.name}}</div>
                <!-- <div class="ua-description">{{value.description}}</div> -->
                <div class="ua-time">{{value.time}}</div>
                <div v-if="value.examine === 1" class="examin-text"><span>审核中</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserArticle } from "@/api"
export default {
    data(){
        return{
            data: [],
        }
    },
    created(){
        this.getArticle()
    },
    methods: {
        async getArticle(){
            let data = await getUserArticle()
            console.log(data)
            this.data = data
        },
        article(index){
            this.$router.push({name:"UArticle",params:{id:this.data[index]._id}})
        }
    }
}
</script>

<style lang="less" scope>
    .user-article{
        // height: 400px;
        // background: cornflowerblue;
        .ua-list{
            padding:20px;
            text-align: center;
            .ua-box{
                display:inline-block;
                position: relative;
                width: 25%;
                margin:10px;
                height: 200px;  
                border: 1px solid #eee;
                .ua-title{
                    font-size:22px;
                    font-weight: bold;
                    padding:10px 0px;
                }
                .ua-category{
                    display: block;
                    width: 68px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 100px;
                    margin:10px auto;
                    background-color: #eaebed;
                    font-size: 12px;
                    color: #525558;
                    text-align: center;
                }
                .ua-description{
                    font-size:13px;
                }
                .ua-time{
                    margin-top:75px;
                    font-size:12px;
                }
                 .examin-text{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(63, 63, 63, 0.5);
                    text-align: center;
                    color:#fff;
                    padding-top:90px;
                    box-sizing: border-box  ;
                }
            }
        }
    }
</style>