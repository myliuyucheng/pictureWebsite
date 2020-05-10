<template>
    <div class="upload-work" @click="showlist">
        <div>
            <ul>
                <li><router-link to="/addworks">单图上传</router-link></li>
                <li><router-link to="/addgworks">组图上传</router-link></li>
                <li><router-link to="/addarticle">文章创造</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        showlist(){
            this.$emit("hideup")
        },
    }
}
</script>

<style lang="less" scope>
    .upload-work{
        position:absolute;
        top:40px;
        right:10px;
        z-index:999;
        background-color:#fff;
        border:1px solid #ccc;
        font-size:14px;
        ul{
            width: 100px;
            li{
                
            }
        }
    }
    .upload-work::before{
        content: "";
        position:absolute;
        width: 0px;
        height: 0px;
        border-top: 0px;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid red;
        top:-10px;
        left:50px;
    }
</style>