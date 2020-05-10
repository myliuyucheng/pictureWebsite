<template>
    <div class="user-article">
        <div class="ua-list">
            <div class="ua-box" v-for="(value,index) in data" :key="index" @click="article(index)">
                <div>{{value.title}}</div>
                <div>{{value.category.name}}</div>
                <div>{{value.desciprtion}}</div>
                <div>{{value.time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUDarticleList } from "@/api"
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
            let data = await getUDarticleList(this.$route.params.id)
            this.data = data.message
        },
        article(index){
            this.$router.push({name:"UDarticle",params:{id:this.data[index]._id}})
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
                // width: 25%;
                margin:10px;
                height: 200px;  
                // background: red;
            }
        }
    }
</style>