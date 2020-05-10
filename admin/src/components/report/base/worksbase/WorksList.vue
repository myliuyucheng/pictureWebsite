<template>
    <div>
        <el-table :data="data" border>

            <el-table-column type="expand">
                <template slot-scope="props" >
                    <el-row style="width:100%"  v-for="(value,index) in props.row.reporttext" :key="index">
                        <el-col :span="12">举报用户：{{ value.user.name }}</el-col>
                        <el-col :span="12">举报详情：{{value.comment}}</el-col>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column
            prop="time"
            sortable
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
            sortable
            width="180">
            </el-table-column>

            <el-table-column
            prop="category.name"
            label="分类"
            sortable
            width="180">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.category.name }}</el-tag>
                </template>
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
                    :src="scope.row.url | setUrl"
                    fit="contain"></el-image>
                </template>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="140">
                <template slot-scope="scope">
                    <el-button
                    type="text" size="medium"
                    @click="edit(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getRWorksList } from "@/api"
export default {
    created() {
        this.worksList()
    },
    data(){
        return{
            data: [],
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
        },
    },
    methods: {
        async worksList(){
            let data = await getRWorksList()
            this.data = data.message
        console.log(this.data)
        },

        edit(index,value){
            this.$router.push({name:'RWorksBox',params:{_id:value._id}})
        },
        
    }
}
</script>


<style lang="">
    
</style>