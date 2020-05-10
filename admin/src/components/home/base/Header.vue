<template>
    <div class="header">
        <!-- <h1>审核系统</h1> -->
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">{{name}}</template>
                <el-menu-item index="1-1" >个人信息</el-menu-item>
                <el-menu-item index="1-2" @click="signOut">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: this.$store.state.name
        }
    },
    methods: {
        signOut(){
            this.$store.dispatch("logout")
            window.location.href = "/login"
            // this.$router.push("/login")
        }
    }
}
</script>

<style lang="less" scope>
    .header{
        .el-menu{
            .el-submenu{
                .template{
                    float:left;
                }
            }
        }
    }
</style>