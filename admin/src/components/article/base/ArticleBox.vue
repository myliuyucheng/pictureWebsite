<template>
    <div>
        <el-card class="box-card">
            <div class="text item">
                标题：{{data.title}}
            </div>
            <div class="text item">
                作者：{{data.author.name}}
            </div>
            <div class="text item">
                分类：{{data.category.name}}
            </div>
            <div class="text item">
                发表时间：{{data.time}}
            </div>
            <div class="text item">
                简介：{{data.description}}
            </div>
            <div class="text item" v-html="data.content">   
            </div>
        </el-card>
        <el-button type="primary" @click="adopt">通过</el-button>
        <el-button type="primary" @click="fail">不通过</el-button>
    </div>
</template>

<script>
import { getEArticle,setAAdopt,setAFail } from "@/api"

export default {
    data(){
        return{
            data:{},
        }
    },
    methods: {
        async article(){
            console.log(data)
            let data = await getEArticle({_id:this.$route.params._id})
            this.data = data.message
        },
        async adopt(){
            let data = await setAAdopt({_id:this.$route.params._id})
            if(data.code == 0){
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                this.$router.push("/article")
            }
        },
        async fail(){
            let data = await setAFail({_id:this.$route.params._id})
            if(data.code == 0){
                this.$message({
                    message: data.message,
                    type: 'success'
                });
            }
        }
    },
    created(){
        this.article()
    }
}
</script>

<style lang="">
    
</style>