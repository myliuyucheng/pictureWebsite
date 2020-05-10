<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input disabled></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: {},
        }
    }
}
</script>

<style lang="less" scope>
    
</style>