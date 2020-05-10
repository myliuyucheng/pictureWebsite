<template>
    <div>
        <el-card class="box-card">
            <Breadcrumb></Breadcrumb>  
        </el-card>
        <el-card class="box-card">
            <router-view/>
        </el-card>
    </div>
</template>

<script>
import Breadcrumb from "@/common/Breadcrumb"

export default {
   components:{
       Breadcrumb,
   },
}
</script>

<style lang="less" scope>
    
</style>