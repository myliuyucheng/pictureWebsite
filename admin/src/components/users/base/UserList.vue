<template>
    <div>
         <el-table
        :data="data"
        border
        style="width: 100%">
            <el-table-column
            fixed
            label="头像"
            width="150">
                <template slot-scope="scope">    
                    <el-image
                    style="width: 100px; height: 100px;"
                    :src="scope.row.url | setUrl"
                    fit="contain"></el-image>
                </template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户账号"
            >
            </el-table-column>
            <el-table-column
            prop="password"
            label="用户密码"
            width="120">
            </el-table-column>
            <el-table-column
            label="管理员"
            width="300">
                <template slot-scope="scope">
                    <span>{{scope.row.isAdmin | setAdmin}}</span>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
                <template slot-scope="scope">
                    <el-button
                    type="text" size="medium"
                    @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="medium" @click="remove(scope.row)">删除用户</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getUserList,deleUser } from "@/api"
export default {
    data(){
        return{
            data: [],
        }
    },
    filters: {
        setUrl(value){
            return "http://localhost:8085/"+value.substr(7)
        },
        setAdmin(value){
            if(value === 0){
                return "普通用户"
            }else if(value === 1){
                return "审核用户"
            }else if(value === 2){
                return "管理员"
            }
        }
    },
    created(){
        this.userList()
    },
    methods: {
        async userList(){
            let data = await getUserList()
            this.data = data.message
        },

        remove(row){
            const _id = row._id
            this.$confirm("此操作将删除用户，是否继续？","提示",{
                confirmButtonText: "确定",
                cancelButtonClass: "取消",
                type: "warning"
            }).then(()=>{
                deleUser(_id).then(data=>{
                    if(data.code == 0){
                        this.$message({
                            type: "success",
                            message: data.message,
                        })
                    }else{
                        this.$message.error(data.message)
                    }
                    getUserList().then(data=>{
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

<style lang="less" scope>
    
</style>