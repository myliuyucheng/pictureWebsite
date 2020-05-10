<template>
    <div class="home">
        <!-- <Header></Header> -->
        
        <Swiper></Swiper>
        <Article></Article>
        <TipsArticles></TipsArticles>
        <Photographer></Photographer>
    </div>
</template>
<script>
// 摄影热门轮播
import Swiper from "./base/Swiper"
// 动态热点推荐
import Article from "./base/Article"
// 摄影技巧
import TipsArticles from "./base/TipsArticles"
// 摄影师热门推荐
import Photographer from "./base/Photographer"

import Header from "@/common/header"

export default {
    data() {
        return {
            
        }
    },
    components: {
        Header,
        Swiper,
        Article,
        TipsArticles,
        Photographer,
    },
}
</script>

<style lang="" scoped>
    
</style>