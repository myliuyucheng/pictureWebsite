<template>
    <div>
        <el-row class="tac">
            <el-col>
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                router>
                    <!-- <el-menu-item :index="'/'+value.path" v-for="(value,index) in routes" :key="index">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{value.meta.title}}</span>
                    </el-menu-item> -->
                    <asideBarItem 
                    v-for="(router,index) in routes" 
                    :key="index" 
                    :router="router" 
                    :index="index"></asideBarItem>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { routes } from "@/router/index"
import asideBarItem from "./asideBarItem"
 
export default {
    created(){
        this.routes = this.$router.options.routes[0].children
    },
    data(){
        return {
            routes: [],
        }
    },
    methods: {
        a(value ){
            console.log(this.$router.options.routes)
            this.$router.options.routes = value.filters(data=>{
                if(data.children){
                   a(value.children) 
                }
                return data.meta && data.meta.title
            })
        },

    },
    components: {asideBarItem,}
}
</script>

<style lang="less" scope>
    .new-a{
        display:block;
    }
</style>