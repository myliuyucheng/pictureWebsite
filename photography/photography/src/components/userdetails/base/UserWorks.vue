<template>
    <div class="user-works">
        <div class="uw-list">
            <div class="uw-photo" v-for="(value,index) in data" :key="index"  @click="works(index)">
                <img :src='"http://localhost:8085/"+value.url' alt="">
                
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { getUDworksList } from "@/api"
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
            let data = await getUDworksList(this.$route.params.id)
            this.data = data.message
            console.log(this.data)
        },
        works(index){
            console.log(index)
            this.$router.push({name:"UDworks",params:{id:this.data[index]._id}})
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
                display: inline-block;
                margin:10px;
                width: 25%;
                height: 200px;
                img{
                    width: 100%;
                    height: 100%;
                }   
            }
        }
    }
</style>