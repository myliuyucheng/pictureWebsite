<template>
    <div class="user-works">
        <div class="uw-list">
            <div class="uw-photo" v-for="(value,index) in data" :key="index"  @click="works(index)">
                <img :src='"http://localhost:8085/"+value.url' alt="">
                <div v-if="value.examine === 1" class="examin-text"><span>审核中</span></div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { getUserWorks } from "@/api"
export default {
    data(){
        return{
            data: [],
        }
    },
    created(){
        this.worksList()
    },
    methods:{
        async worksList(){
            let data = await getUserWorks({_id:this.$route.params.id})
            this.data = data.message
        },
        works(index){
            console.log(index)
            console.log(this.data)
            this.$router.push({name:"UWorks",params:{id:this.data[index]._id}})
        }
    }
}
</script>

<style lang="less" scope>
    .user-works{
        .uw-list{
            padding:20px;
            text-align: center;
            .uw-photo{
                position: relative;
                display: inline-block;
                margin:10px;
                width: 25%;
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