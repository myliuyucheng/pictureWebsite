<template>
    <div class="">
        <div class="">
            <!-- 日期 -->
            <el-date-picker
            v-model="startDateText"
            align="right"
            type="date"
            placeholder="选择开始日期">
            </el-date-picker>
            <el-date-picker
            v-model="endDateText"
            align="right"
            type="date"
            placeholder="选择结束日期">
            </el-date-picker>

            <!-- 用户名 -->
            <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入用户名"
            @select="handleSelect" clearable>
                <!-- <i class="el-icon-edit el-input__icon" slot="suffix"></i> -->
                <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                </template>
            </el-autocomplete>

            <!-- 分类 -->
            <el-select v-model="categoryText" placeholder="请选择分类" clearable>
                <el-option
                v-for="item in categoryList"
                :key="item._id"
                :label="item.name"
                :value="item._id">
                </el-option>
            </el-select>

            <el-button plain @click="search">搜索</el-button>
            <el-button plain @click="reset">重置</el-button>
        </div>
       

        <el-table
        :data="tableData"
        border
        style="width: 100%;height:100%">
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
                    <el-button type="text" size="medium" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration">页数较少时的效果</span>
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getWorksList,getUserList,getCategoryList,deleWorks } from "@/api"

export default {
     methods: {
        async works(){
            let data = await getWorksList()
            this.tableData = data.message
        },
        edit(index,value){
            this.$router.push({name:'WorkssBox',params:{_id:value._id}})
        },


        querySearch(queryString, cb) {
            // console.log(queryString) 自己输入的数据
            // console.log(cb)
            var restaurants = this.restaurants;
            // 没有输入的时候返回整个列表
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                // console.log(restaurant) 是列表里面的数据，从列表里面找自己输入的数据
                return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        async getUser(){
            let data = await getUserList()
            this.restaurants = data.message
        },
        handleSelect(a){
            this.state = a.name
        },


        async getCategory(){
            let data = await getCategoryList()
            this.categoryList = data.message
        },


        search(){
            this.tableData = this.tableData.filter(data=>{
                let date = new Date(data.time)
                // 日期比较
                let dateCompare = false
                if(!this.startDateText || !this.endDateText){dateCompare = true}else{
                    if((date.getFullYear() >= this.startDateText.getFullYear()) && (date.getFullYear() <= this.endDateText.getFullYear())){
                        if((date.getMonth() >= this.startDateText.getMonth()) && (date.getMonth() <= this.endDateText.getMonth())){
                            if((date.getDate() >= this.startDateText.getDate()) && (date.getDate() <= this.endDateText.getDate())){
                                dateCompare = true
                            }
                        }
                    }
                }
                let a = (!this.categoryText ? true : this.categoryText === data.category._id) && (!this.state ? true : this.state === data.author.name) && dateCompare 
                return a
            })
        },

        async reset(){
            let data = await getWorksList()
            this.tableData = data.message
            this.state = ""
            this.categoryText = ""
            this.startDateText = ""
            this.endDateText = ""
        },


        remove(row){
            const _id = row._id
            this.$confirm("此操作将删除作品，是否继续？","提示",{
                confirmButtonText: "确定",
                cancelButtonClass: "取消",
                type: "warning"
            }).then(()=>{
                deleWorks(_id).then(data=>{
                    if(data.code == 0){
                        this.$message({
                            type: "success",
                            message: data.message,
                        })
                    }else{
                        this.$message.error(data.message)
                    }
                    getWorksList().then(data=>{
                        this.tableData = data.message
                    })
                })
            }).catch(()=>{
                this.$message({
                    type: "info",
                    message: "已取消删除"
                })  
            })
        },
    },
    filters: {
        setUrl(value){
            console.log(value)
            return "http://localhost:8085/"+value
        },
        setDate(value){
            let date = new Date(value)
            return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
        }
    },
    created() {
        this.works()
        this.getUser()
        this.getCategory()
    },
    data() {
      return {
        tableData:[],

        startDateText: "",
        endDateText: "",

        state: "",
        restaurants: [],

        categoryList: [],
        categoryText: "",
      }
    },
}
</script>

<style lang="less" scope>
    
</style>