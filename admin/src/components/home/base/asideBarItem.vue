<template>
    <div>
        <el-submenu 
        v-if="router.children&&router.children.length>0 && !!router.meta.navmenu">
            <span slot="title"><i class="el-icon-location"></i>{{router.meta.title}}</span>
            <asideBarItem v-for="(child, childKey) in router.children" :key="child.path" :router="child" :index="index+'-'+childKey" :parent="parent ? parent + '/' + router.path : router.path"></asideBarItem>
        </el-submenu>
        <el-menu-item
        v-if="(!router.meta.navmenu)"
        :key="router.path"
        :index="parent ? '/' + parent + '/' + router.path : '/' + router.path">
            <i class="el-icon-location"></i>
            <span slot="title">{{router.meta.title}}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: "asideBarItem",
    props: [
        "router",
        "index",
        "parent",
    ]
}
</script>