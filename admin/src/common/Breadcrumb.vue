<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(value,index) in levelList" :key="index"><a @click="handleLink(index)">{{value.meta.title}}</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return {
            levelList: [],
        }
    },
    watch: {
        $route(route) {
            this.getBreadcrumb()
        }
    },
    created(){
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb(){
            // let matched = this.$route.matched.filter(item => 
            // item.meta && item.meta.title && item.meta.breadcrumb)
            this.levelList = this.$route.matched.filter(item => 
            item.meta && item.meta.title && item.meta.breadcrumb)
        },
        handleLink(index){
            let path = this.levelList[index].path
            this.$router.push({path})
        }
    }
}
</script>

<style lang="">
    
</style>