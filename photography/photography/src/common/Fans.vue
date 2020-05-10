<template>
    <div class="fans">
        <div class="fans-box">
            <div class="fans-title"><span>粉丝</span><span class="fans-close" @click="close">X</span></div>
            <div class="fans-content">
                <ul>
                    <li v-for="(value,index) in data" :key="index">
                        <div class="fc-left">
                            <img :src="value.user.url|setUrl" alt="">
                            <span>{{value.user.name}}</span>
                        </div>
                        <div class="fc-right">
                            <div v-if="cfollow(index)" @click="reFollow($event,index)">取消关注</div>
                            <div v-else @click="reFollow($event,index)">关注</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getSelfFollow,setFollow,removeFollow } from "@/api"
export default {
    props: ["data"],
    filters: {
        setUrl(value){
            let url = value.substr(7)
            console.log(url)  
            return `http://localhost:8085/${url}`
        }
    },
    data(){
        return {
            selfFollow: [],
        }
    },
    created(){
        this.follow()
    },
    methods: {
        close(){
            this.$emit("fansClose")
        },


        async reFollow(e,index){
            let data 
            if(e.target.innerText === "关注"){
                data = await setFollow(this.data[index].user._id)
                e.target.innerText = "取消关注"
            }else{
                data = await removeFollow(this.data[index].user._id)
                e.target.innerText = "关注"
            }
        },
        async follow(){
            let selfdata = await getSelfFollow()
            this.selfFollow = selfdata.message
        },
        cfollow(index){
            if(!this.selfFollow){
                return false
            }else{
                return this.selfFollow.some(data=>data.user._id == this.data[index].user._id)
            }
        },
    }
}
</script>
<style lang="less" scope>
    .fans{
        position: fixed;
        z-index:999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(10, 10, 10, 0.5);
        .fans-box{
            width: 300px;
            // height: 400px;
            margin:100px auto;
            background:#fff;
            // padding:10px;
            .fans-title{
                font-size:20px;
                padding:10px;
                border-bottom:1px solid #eee;
                .fans-close{
                    float: right;
                    cursor: pointer;
                }
            }
            .fans-content{
                height: 300px;
                overflow: auto;
                ul{
                    li{
                        padding:10px;
                        overflow: hidden;
                        .fc-left{
                            float:left;
                            img{
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                border:1px solid rgb(116, 158, 248);
                                vertical-align: middle;
                            }
                            span{
                                vertical-align: middle;
                                font-size: 15px;
                            }
                        }
                        .fc-right{
                            float: right;
                            margin-top:10px;
                            div{
                                cursor: pointer;
                                background:rgb(61, 156, 245);
                                padding:5px;
                                font-size:13px;
                                color:#fff;
                                border-radius: 5px;
                                text-align: center;
                                width: 60px;
                            }
                            div:hover{
                                background:rgb(51, 129, 202);
                            }
                        }
                    }
                }
            }
        }
    }
</style>