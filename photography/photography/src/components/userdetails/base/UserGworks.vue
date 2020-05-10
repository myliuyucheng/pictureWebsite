<template>
    <div class="user-gworks">
        <div class="ug-list">
            <div class="ug-photo" v-for="(value,index) in data" :key="index" @click="gworks(index)">
                <img :src='"http://localhost:8085/"+value.url[0]' alt="">
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { getUDgworksList } from "@/api"
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
            let data = await getUDgworksList(this.$route.params.id)
            this.data = data.message
        },
        gworks(index){
            console.log(this.data[index]._id)
            this.$router.push({name:"UDgworks",params:{id:this.data[index]._id}})
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
                width: 25%;
                margin:10px;
                height: 200px;
                img{
                    width: 100%;
                    height: 100%;
                }   
                // background: darkgrey;
            }
        }
    }
</style>