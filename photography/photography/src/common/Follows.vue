<template>
    <div class="follow">
        <div class="follow-box">
            <div class="follow-title"><span>关注</span><span class="follow-close" @click="close">X</span></div>
            <div class="follow-content">
                <ul>
                    <li v-for="(value,index) in data" :key="index">
                        <div class="fc-left">
                            <img :src="value.user.url|setUrl" alt="">
                            <span>{{value.user.name}}</span>
                        </div>
                        <div class="fc-right">
                            <div class="button" v-if="cfollow(index)" @click="reFollow($event,index)">取消关注</div>
                            <div class="button" v-else @click="reFollow($event,index)">关注</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { setFollow,getFollow,getSelfFollow,removeFollow } from "@/api"
export default {
    data(){
        return{
            data: [],
            selfFollow: [],
        }
    },
    props: ["id"],
    filters: {
        setUrl(value){
            let url = value.substr(7)
            return `http://localhost:8085/${url}`
        }
    },
    created(){
        this.follow()
    },
    methods: {
        close(){
            this.$emit("followClose")
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
            let data = await getFollow(this.id)
            this.data = data.message
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
    .follow{
        position: fixed;
        z-index:999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(10, 10, 10, 0.5);
        .follow-box{
            width: 300px;
            margin:100px auto;
            background:#fff;
            // padding:10px;
            .follow-title{
                font-size:20px;
                padding:10px;
                border-bottom:1px solid #eee;
                .follow-close{
                    float: right;
                    cursor: pointer;
                }
            }
            .follow-content{
                ul{
                    height: 300px;
                    overflow: auto;
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
                            .button{
                                cursor: pointer;
                                background:rgb(61, 156, 245);
                                padding:5px;
                                font-size:13px;
                                color:#fff;
                                border-radius: 5px;
                                text-align: center;
                                width: 60px;
                            }
                            .button:hover{
                                background:rgb(51, 129, 202);
                            }
                        }
                    }
                }
            }
        }
    }
</style>