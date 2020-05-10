<template>
    <div>
        <el-table
        :data="tableData"
        border
        style="width: 100%;height:100%;">
            <el-table-column
            prop="time"
            label="发表日期"
            width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.time | setDate }}</span>
                </template>
            </el-table-column>

            <el-table-column
            prop="title"
            label="标题"
            width="180">
            </el-table-column>

                <el-table-column
            prop="author.name"
            label="作者"
            width="180">
            </el-table-column>

            <el-table-column
            prop="category.name"
            label="分类"
            width="180">
            </el-table-column>

            <el-table-column
            prop="description"
            label="简介">
            </el-table-column>

            <!-- <el-table-column
            prop="url"
            label="作者">
            </el-table-column> -->

            <el-table-column
            fixed="right"
            label="操作"
            width="120">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="edits(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import { EArticleList } from "@/api"

export default {
    methods: {
        async earticle(){
            let data = await EArticleList()
            this.tableData = data
        },
        edits(index,value){
            this.$router.push({name:'ArticleBox',params:{_id:value._id}})
            console.log(value._id)
        },
    },
    filters: {
        setDate(value){
            let date = new Date(value)
            return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
        }
    },
    created() {
        this.earticle()
    },
    data() {
      return {
        tableData:[]
      }
    },
}
</script>

<style lang="">
    
</style>