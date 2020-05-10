<template>
    <div class="user-gworks">
        <div class="ug-list">
            <div class="ug-photo" v-for="(value,index) in data" :key="index" @click="gworks(index)">
                <img :src='"http://localhost:8085/"+value.url[0]' alt="">
                <div v-if="value.examine === 1" class="examin-text"><span>审核中</span></div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { getUserGworks } from "@/api"
export default {
    data(){
        return{
            data: [],
        }
    },
    created(){
        this.gworksList()
    },
    methods:{
        async gworksList(){
            let data = await getUserGworks()
            this.data = data
        },
        gworks(index){
            console.log(this.data[index]._id)
            this.$router.push({name:"UGworks",params:{id:this.data[index]._id}})
        }
    }
}
</script>

<style lang="less" scope>
    .user-gworks{
        // height: 400px;
        // background: cornflowerblue;
        .ug-list{
            padding:20px;
            text-align: center;
            .ug-photo{
                display: inline-block;
                position: relative;
                width: 25%;
                margin:10px;
                height: 200px;
                img{
                    width: 100%;
                    height: 100%;
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