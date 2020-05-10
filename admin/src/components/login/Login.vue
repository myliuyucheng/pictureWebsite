<template>
    <div class="login-container">
        <div class="log-con-box">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span >登录</span>
                </div>
                <div class="text item">
                    <el-form :model="loginForm" status-icon :loginRules="loginRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号" prop="username">
                            <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { ELogin } from "@/api"
import { getAdmin } from "@/utils/isAdmin"

import {admin,auditor} from "@/router/index"

export default {
    data(){
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return{
            loginForm: {
                username: 'admin',
                password: '111111',
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
        }
    },
    methods: {
        async login() {
            let username = this.loginForm.username
            let password = this.loginForm.password
            let data = await ELogin({username,password})
            if(data.code == 0){
                let token = data.token
                let name = data.name
                let isAdmin = data.isAdmin
                this.$message.error(data.message);
            //     let router
            // console.log(auditor)
            // console.log(admin)
            //     if(data.isAdmin === 1){
            //         this.$router.options.routes = auditor
            //         this.$router.addRoutes(auditor)
            //         router = auditor
            //         console.log(auditor)
            //     }else if (data.isAdmin === 2){
            //         this.$router.options.routes = admin
            //         this.$router.addRoutes(admin)
            //         router = admin
            //     }
            //     console.log(this.$router.options.routes)
                this.$store.dispatch("login",{token,name,isAdmin})
                
                this.$router.push({path:"/"})
            }else{
                this.$message.error(data.message);
            }
        }

    }
}
</script>

<style lang="less" scope>
    .login-container{
        .log-con-box{
            width: 400px;
            margin:50px auto;
            .el-card{
                .clearfix{
                    text-align: center;
                }
            }
        }
    }
</style>