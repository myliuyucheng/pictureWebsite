<template>
    <div>
        <el-card class="box-card">
            <Breadcrumb></Breadcrumb> 
        </el-card>
        <el-card class="box-card">
            <UserList></UserList> 
        </el-card>
    </div>
</template>

<script>
import Breadcrumb from "@/common/Breadcrumb"
import UserList from "./base/UserList"  

export default {
    components: {
        Breadcrumb,
        UserList,
    }
}
</script>

<style lang="less" scope>
</style>