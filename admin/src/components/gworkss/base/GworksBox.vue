<template>
<div>
    <el-row type="flex">
        <el-col :span="12"><div class="grid-content bg-purple">
            <el-image 
                :src="url[0]" 
                :preview-src-list="url"
                fit="cover">
            </el-image>
        </div></el-col>
        <el-col :span="12" class="bg-right"><div class="grid-content bg-purple-light">
            <el-card class="box-card">
                <div class="text item">
                    标题：{{data.title}}
                </div>
                <div class="text item" v-if="data.author">
                    作者：{{data.author.name}}
                </div>
                <div class="text item">
                    发表时间：{{data.time}}
                </div>
                <div class="text item" v-if="data.category">
                    分类：{{data.category.name}}
                </div>
                <div class="text item">
                    简介：{{data.description}}
                </div>
            </el-card>
        </div></el-col>
    </el-row>
</div>
</template>

<script>
import { getGworks } from "@/api"
export default {
    data(){
        return{
            data:{},
            url: [ ],
        }
    },
    created(){
        this.gworks()
    },
    methods: {
        async gworks(){
            let data = await getGworks(this.$route.params._id)
            this.data = data.message
            let url = this.data.url
            for(let a=0;a<url.length;a++){
                this.url.push("http://localhost:8085/"+url[a])
            }
        },
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