<template>
<div>
    <el-row type="flex">
        <el-col :span="12"><div class="grid-content bg-purple">
            <el-image 
                :src="url" 
                :preview-src-list="[url]"
                fit="cover">
            </el-image>
        </div></el-col>
        <el-col :span="12" class="bg-right"><div class="grid-content bg-purple-light">
            <el-card class="box-card">
                <div class="text item">
                    标题：{{data.title}}
                </div>
                <div class="text item">
                    作者：{{data.author.name}}
                </div>
                <div class="text item">
                    发表时间：{{data.time}}
                </div>
                <div class="text item">
                    分类：{{data.category.name}}
                </div>
                <div class="text item">
                    简介：{{data.description}}
                </div>
            </el-card>
        </div></el-col>
    </el-row>
    <el-button type="primary" @click="adopt">举报符合</el-button>
    <el-button type="primary" @click="fail">举报不符</el-button>
</div>
</template>

<script>
import { getRWorks,RWorksAdopt,RWorksFail } from "@/api"
export default {
    data(){
        return{
            data:{},
            url: "",
        }
    },
    created(){
        this.works()
    },
    methods: {
        async works(){
            let data = await getRWorks(this.$route.params._id)
            this.data = data.message
            this.url = "http://localhost:8085/"+this.data.url
        },
        async adopt(){
            let data = await RWorksAdopt(this.$route.params._id)
            if(data.code == 0){
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                this.$router.go(-1)
            }
        },
        async fail(){
            let data = await RWorksFail(this.$route.params._id)
            if(data.code == 0){
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                this.$router.go(-1)
            }
        }
    },
}
</script>

<style lang="less" scope>
.bg-right{
    .bg-purple-light{
        height: 100%;
        .box-card{
            height: 100%;
            box-sizing: border-box;
        }
    }
}
</style>