<template>
    <div>
        <el-button plain @click="add">添加</el-button>
        <el-table
        :data="data"
        border
        >
            <el-table-column
            prop="_id"
            label="分类id"
            ></el-table-column>
            <el-table-column
            prop="name"
            label="分类名称"
            ></el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="medium" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" size="medium" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getAcategoryList,setAcategory,addAcategory,deleAcategory } from "@/api"
export default {
    data(){
        return{
            data: []
        }
    },
    created(){
        this.acategory()
    },
    methods: {
        async acategory(){
            let data = await getAcategoryList()
            this.data = data.message
        },

        edit(row){
            let text = row.name
            this.$prompt("请修改文章分类名称","编辑",{
                confirmButtonText: "修改",
                cancelButtonClass: "取消",
                inputValue: text,
            }).then(({ value })=>{
                let name = value
                let _id = row._id
                setAcategory(_id,name).then(data=>{
                    if(data.code == 0){
                        this.$message({
                            message: data.message,
                            type: "success",
                        })
                    }else{
                        this.$message.error(data.message)
                    }
                    getAcategoryList().then(data=>{
                        this.data = data.message
                    })
                })
            })
        },

        add(){
            this.$prompt("请添加文章分类名","添加",{
                confirmButtonText: "添加",
                cancelButtonClass: "取消",
            }).then(({ value })=>{
                let name = value
                addAcategory(name).then(data=>{
                    if(data.code == 0){
                        this.$message({
                            message: data.message,
                            type: "success",
                        })
                    }else{
                        this.$message.error(data.message)
                    }
                    getAcategoryList().then(data=>{
                        this.data = data.message
                    })
                })
            })
        },

        remove(row){
            const _id = row
            this.$confirm("此操作将删除分类，是否继续？","提示",{
                confirmButtonText: "确定",
                cancelButtonClass: "取消",
                type: "warning"
            }).then(()=>{
                deleAcategory(_id).then(data=>{
                    if(data.code == 0){
                        this.$message({
                            type: "success",
                            message: data.message,
                        })
                    }else{
                        this.$message.error(data.message)
                    }
                    getAcategoryList().then(data=>{
                        this.data = data.message
                    })
                })
            }).catch(()=>{
                this.$message({
                    type: "info",
                    message: "已取消删除"
                })  
            })
        },

    }
}
</script>

<style lang="">
    
</style>