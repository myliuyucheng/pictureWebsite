<template>
    <div>
        <el-table
        :data="tableData"
        border
        style="width: 100%;height:100%">
            <!-- prop="time" -->
            <el-table-column
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

            <el-table-column
            label="图片">
                <template slot-scope="scope">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.url[0] | setUrl"
                    fit="contain"></el-image>
                </template>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="140">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="edit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import { EGworksList } from "@/api"

export default {
     methods: {
        async eworks(){
            let data = await EGworksList()
            this.tableData = data
        },
        edit(index,value){
            this.$router.push({name:'GworksBox',params:{_id:value._id}})
        }
    },
    filters: {
        setUrl(value){
            console.log(value)
            return "http://localhost:8085/"+value
        },
        setDate(value){
            let date = new Date(value)
            return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
        }
    },
    created() {
        this.eworks()
    },
    data() {
      return {
        tableData:[],
      }
    },
}
</script>

<style lang="less" scope>
    
</style>