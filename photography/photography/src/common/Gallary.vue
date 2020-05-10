<template>
    <div class="gallary" @click="handleClick">
        <div class="wrapper">
            <swiper :options="swiperOption">
                <swiper-slide v-for='(item,index) in gallaryImgs' :key='index' class="swiper-img-box">
                    <img class='swiper-img' :src="item|url" alt="" @load="imgWidth" ref="img">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
export default {
    name:'CommonGallary',
    props:['gallaryImgs'],
    data(){
        return{
            swiperOption:{
                pagination:{
                    el:'.swiper-pagination',
                    type:'fraction'
                },
                observeParents:true,
                observer:true
            }
        }
    },
    created(){
        console.log(this.gallaryImgs)
    },
    filters:{
        url(value){
            return "http://localhost:8085/"+value
        }
    },
    methods:{
        handleClick(){
            this.$emit('close')
        },
        imgWidth(e){
            let img = this.$refs.img
            for(let i = 0;i<img.length;i++){
                let width = img[i].naturalWidth
                let height = img[i].naturalHeight
                let wWidth = document.body.clientWidth
                let wHeight = document.body.clientHeight

                let proportion = (width / height).toFixed(2)

                if(width >= height){
                    img[i].style.height = `${wHeight}px`
                    img[i].style.width = `${(wHeight * proportion)}px`
                }else{
                    img[i].style.width =`${wWidth}px`
                    img[i].style.height =`${(wWidth * proportion)}px`
                }
            }
        },
    }
}
</script>


<style lang="less" scoped>
  .gallary{
      position:fixed;
      z-index:10;
      left:0;
      right:0;
      top:0;
      bottom:0;
    // height: 100%;
      background:#000;
      .wrapper{
          position:absolute;
          top:0;
          bottom:0;
          margin:auto;
          width:100%;
          padding-bottom:62.5%;
        //   height: 100%;
          background:#fff;
      }
      .swiper-img-box{
          text-align: center;
        //   height: 100%;
          .swiper-img{
          }
      }
      .swiper-pagination{
          bottom:-1rem;
          color:#fff;
      }
  }
</style>