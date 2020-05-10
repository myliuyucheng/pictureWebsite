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
    </div>
</template>

<script>
import { getArticle } from "@/api"

export default {
    data(){
        return{
            data:{},
        }
    },
    methods: {
        async article(){
            console.log(data)
            let data = await getArticle(this.$route.params._id)
            this.data = data.message
        },
    },
    created(){
        this.article()
    }
}
</script>

<style lang="">
    
</style>