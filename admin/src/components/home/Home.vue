<template>
    <div class="home">
        <el-container class="home-box">
            <el-header><Header></Header></el-header>
            <el-container class="home-content">
                <el-aside width="200px"><NavMenu></NavMenu></el-aside>
                <el-container class="middle">
                    <el-main>
                        <el-card class="box-card">
                            <Breadcrumb></Breadcrumb>  
                        </el-card>
                        <router-view/>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from "./base/Header"
import NavMenu from "./base/NavMenu"
import Breadcrumb from "@/common/Breadcrumb"
export default {
    components:{
        NavMenu,
        Header,
        Breadcrumb,
    },
    created(){
        console.log(3)
    },
}
</script>

<style lang="less" scope>
.home{
    height: 100%;
    .home-box{
        height: 100%;
        .el-header{
            padding:0px;
        }
        .home-content{
            height: calc(100% - 60px);
            .el-aside {
                background-color: #D3DCE6;
                color: #333;
                text-align: center;
                height: 100%;
                overflow-y: auto;
            }
            .middle{
                height: 100%;
                overflow: auto;
                .el-main {
                    background-color: #E9EEF3;
                    color: #333;
                    text-align: center;
                }
            }
        }
    }
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
    
 

</style>