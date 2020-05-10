<template>
    <div class="user-list" @click="showlist">
        <div>
            <ul>
                <li><router-link to="/user/works">我的主页</router-link></li>
                <li @click="quit">退出</li>
            </ul>
        </div>
    </div>
</template> 

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        showlist(){
            this.$emit("hidelist")
        },
        quit(){
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("name")  
            this.$store.commit("setname","")
            this.$router.push({
                path: "/login"
            })
        }
    },
}
</script>

<style lang="less" scope>
    .user-list{
        position:absolute;
        top:40px;
        right:110px;
        z-index:999;
        background-color:#fff;
        border:1px solid #ccc;
        font-size:14px;
        ul{
            width: 100px;
        }
    }
    .user-list::before{
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