<template>
    <div class="swiper">
        <swiper :options="swiperOption" ref="Swiper" >
            <!-- slides -->
            <swiper-slide v-for="(value,index) in imgs" :key="index">
                <!-- {{'http://localhost:8085'+value.url}} -->
                <img class="swiper-img" :src="'http://localhost:8085'+value.url" alt="">
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>
    </div>
</template>

<script>
import { swiperImg } from "@/api"
export default {
    data() {
        return {
            imgs:[],
            swiperOption: {
                // 分页器
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                // 前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // 环路
                loop: true,
                // 自动播放
                autoplay: {
                    delay: 3000,
                }
            },


            
        }
    },
    created() {
       this.getImg()
    },
    methods: {
        async getImg(){
            let imgss = await swiperImg()
            console.log(2)
            this.imgs = imgss
        }
    },
}
</script>

<style lang="less" scope>
    .swiper{
        width:100%;
        height: 550px;
        .swiper-img{
            width: 100%;
            height: 100%;
        }
        .swiper-container{
            height:100%
        }
    }
</style>