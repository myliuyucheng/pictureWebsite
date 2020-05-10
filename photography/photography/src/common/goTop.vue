<template>
    <div v-if="btnFlag" @click="backTop" class="go-top">
        ︿
    </div>
</template>

<script>
export default {
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
    },
    data(){
        return {
            btnFlag: false,
        }
    },
    methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
        backTop () {
            const that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                    clearInterval(timer)
                }
            }, 16)
        },
    
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop () {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 60) {
                that.btnFlag = true
            } else {
                that.btnFlag = false
            }
        }
    }
}
</script>

<style lang="less" scope>
.go-top{
    width: 50px;
    height: 50px;
    background: rgba(0,0,0,0.5);
    border-radius: 5px;
    color:#fff;
    text-align: center;
    cursor: pointer;
    position: fixed;
    right: 10px;
    bottom: 10px;
    font-size:30px;
}
  
</style>