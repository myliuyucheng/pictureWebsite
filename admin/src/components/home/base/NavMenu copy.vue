<template>
    <div>
        <el-row class="tac">
            <el-col>
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                router>
                    <el-menu-item :index="'/'+value.path" v-for="(value,index) in routes" :key="index">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{value.meta.title}}</span>
                    </el-menu-item>

                    <!-- <el-menu-item index="/works">
                        <i class="el-icon-menu"></i>
                        <span slot="title">作品审核</span>
                    </el-menu-item>
                    <el-menu-item index="/gworks">
                        <i class="el-icon-menu"></i>
                        <span slot="title">作品集审核</span>
                    </el-menu-item>
                    <el-menu-item index="/article">
                        <i class="el-icon-document"></i>
                        <span slot="title">文章审核</span>
                    </el-menu-item>

                    <el-menu-item index="/report">
                            <i class="el-icon-setting"></i>
                            <span slot="title">举报审核</span>
                    </el-menu-item> -->
                    
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { routes } from "@/router/index"
 
export default {
    created(){
        this.routes = routes[0].children
        // this.a(routes[0].children)
        // console.log(this.routes)
        // this.routes = global.antRouter[0].children
        // console.log(this.routes)
    },
    data(){
        return {
            routes: [],
        }
    },
    methods: {
        a(value ){
            this.routes = value.filters(data=>{
                if(data.children){
                   a(value.children) 
                }
                return data.meta && data.meta.title
            })
        },

    },
}
</script>

<style lang="less" scope>
    .new-a{
        display:block;
    }
</style>