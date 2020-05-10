<template>
    <div class="userlist-box">
        <div class="user-box" v-for="(value,index) in data" :key="index" @click="userDetails(index)">
            <div class="back-box"><img :src="value.profileurl|setUrl" alt=""></div>
            <div class="user-head"><img :src="value.url|sethUrl" alt=""></div>
            <div class="user-details">
                <h2>{{value.name}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { userList } from "@/api"
export default {
    data(){
        return{
            data: [],
        }
    },
    filters: {
        setUrl(value){
            return "http://localhost:8085/"+value
        },
        sethUrl(value){
            console.log(value )
            let url = value.substr(7)
            console.log(url)
            return "http://localhost:8085/"+url
        }
    },
    created(){
        this.getUserList()
    },
    methods: {
        async getUserList(){
            let data = await userList()
            console.log(data)
            this.data = data
        },
        userDetails(index){
            console.log(this.data[index]._id)
            this.$router.push({name:"UDworksList",params:{
                id: this.data[index]._id
            }})
        }
    }
}
</script>

<style lang="less" scope>
    .userlist-box{
        height: 100%;
        padding:10px;
        background: #f7f8fa;
        // background:burlywood;
        margin:auto;
        .user-box{
            display: inline-block;
            width: calc((100% - 120px) / 5);
            position: relative;
            margin: 10px;
            box-sizing: border-box;
            .back-box{
                background: cadetblue;
                height: 170px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .user-head{
                position: absolute;
                height: 70px;
                box-sizing: border-box;
                width: 70px;
                border-radius: 50%;
                margin-left:-35px;
                margin-top:-35px;
                left:50%;
                background: chartreuse;
                border: 2px solid #fff;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .user-details{
                text-align: center;
                background: #fff;
                padding-top: 40px;
                padding-bottom: 20px;
            }
        }
    }
</style>