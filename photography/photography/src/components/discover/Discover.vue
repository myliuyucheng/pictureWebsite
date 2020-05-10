<template>
    <div class="article-list">
        <Navbar></Navbar>
        <router-view/>

    </div>
</template>

<script>
import Navbar from "./base/Navbar"
export default {
    data() {
        return {
            
        }
    },
    components: {
        Navbar,
    }
}
</script>

<style lang="" scope>
    .article-list{
        background: #F7F8FA;
        /* height: 100%; */
    }
</style>