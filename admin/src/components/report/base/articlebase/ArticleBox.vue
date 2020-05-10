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
        <el-button type="primary" @click="adopt">举报符合</el-button>
        <el-button type="primary" @click="fail">举报不符</el-button>
    </div>
</template>

<script>
import { getRArticle,RArticleAdopt,RArticleFail } from "@/api"

export default {
    data(){
        return{
            data:{},
        }
    },
    methods: {
        async article(){
            let data = await getRArticle(this.$route.params._id)
            this.data = data.message
        },


        async adopt(){
            let data = await RArticleAdopt(this.$route.params._id)
            if(data.code == 0){
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                this.$router.go(-1)
            }
        },
        async fail(){
            let data = await RArticleFail(this.$route.params._id)
            if(data.code == 0){
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                this.$router.go(-1)
            }
        },
    },
    created(){
        this.article()
    }
}
</script>

<style lang="">
    
</style>