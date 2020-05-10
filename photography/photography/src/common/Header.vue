<template>
    <div class="header">
        <ul>
            <li class="logo"><img src="@/assets/image/logo.png" alt=""></li>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/discover/works">摄影作品</router-link></li>
            <li><router-link to="/skills">摄影技巧</router-link></li>
            <li><router-link to="/userlist">摄影师</router-link></li>
            <div class="right">
                <div v-if="!user">
                    <ul>
                        <li><router-link to="/login">登录</router-link></li>
                        <li><router-link to="/register">注册</router-link></li>
                    </ul>
                </div>
                <div v-else>
                    <ul>
                        <li @click="showlist">
                            {{this.user}}
                        </li>
                        <li @click="showup">
                            上传作品
                        </li>
                        <UserLink v-if="showuser" @hidelist="hidelist"></UserLink>
                        <UploadWork v-if="showupload" @hideup="hideup"></UploadWork>
                    </ul>
                </div>
            </div>
            
        </ul>
    </div>
</template>

<script>
import UserLink from "./UserLink"
import UploadWork from "./UploadWork"
export default {
    name: 'headerNav',
    data() {
        return {
            showuser: false,
            showupload: false,
            user: window.localStorage.getItem("name") || ""
        }
    },
    created(){
        console.log("重新熏染了")
    },
    computed: {
        haha () {
            console.log("改变了")
            return this.$store.state.name;
        },
        username(){
            this.user = this.$store.state.name
            return 
        }
    },
    // 监听name的变化
    watch: {
        user(){
            // 监听vuex name
            console.log("监听到了user变化")
            this.user = this.$store.state.name;
            return 
        },
        haha(){
            this.user = this.$store.state.name
            return
        }
    },
    methods: {
        showlist(){
            this.showuser = !this.showuser
        },
        hidelist(){
            this.showuser = false
        },


        showup(){
            this.showupload = !this.showupload
        },
        hideup(){
            console.log("触发了")
            this.showupload = false
        }
    },
    components: {
        UserLink,
        UploadWork,
    }
}
</script>

<style lang="less" scope>
    .header{
        border-bottom:1px solid #EEEFF2;
            // overflow: hidden;
        position: relative;
        z-index: 5;
        ul{
            line-height:40px;
            overflow: hidden;
            li{
                float: left;
                margin:0px 20px;
            }
            .logo{
                width: 20px;
                height: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                float:right;
                li{
                    cursor: pointer;
                }
            }
        }
    }
</style>