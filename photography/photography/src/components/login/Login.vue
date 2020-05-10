<template>
    <div class="login">
        <div class="loginbox">
            <h1>登录</h1>
            <div class="loginform">
                <div class="inputbox">
                    <input type="text" v-model="username" placeholder="账号" @blur="usernameCheck">
                    <div class="error">{{usernameError}}</div>
                </div>
                <div class="inputbox">
                    <input type="password" v-model="password" placeholder="密码" @blur="passwordCheck">
                    <div class="error">{{passwordError}}</div>
                </div>
                <div class="error loginError">{{error}}</div>
                <div @click="logins" class="logbut">登录</div>
            </div>
            <div class="regbox">
                还没账号？
                <router-link to="/register" class="reg">立即注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "@/api"

export default {
    data() {
        return {
            username: "",
            password: "",
            // 验证表单是否通过
            check: [false,false],
            // 表单错误信息
            usernameError: "",
            passwordError: "", 

            error: "",
        }
    },
    methods:{
        // 登入按钮
        async logins(){
            if(this.check.every(value=>value)){
                console.log(this.username)
                console.log(this.password)
                let data = await login(this.username, this.password);
                console.log(data)
                // 成功了设置用户名,在转跳
                if(data.code === 0) {
                    window.localStorage.setItem("token",data.token)
                    window.localStorage.setItem("name",data.name)
                    this.$store.commit("setname",data.name)
                    this.$router.push({ path: '/'})
                }
                return this.error = data.message
            }
            return this.error = "请填写完信息"
        },

        // 账号校验
        usernameCheck(){
            let username = this.username
            this.check[0] = false

            if(username.length == 0){
                return this.usernameError = "账号不能为空"
            }
            this.check[0] = true
            return this.usernameError = ""
        },

        // 密码校验
        passwordCheck(){
            let password = this.password
            this.check[1] = false

            if(password.length == 0){
                return this.passwordError = "密码不能为空"
            }
            this.check[1] = true
            return this.passwordError = ""
        }
    }
}
</script>

<style lang="less" scope> 
    .radius{
        border-radius: 5px;
    }
    .borders{
        border: 1px solid #999; 
    }

    .login{
        .loginbox{
            .radius;
            margin:100px auto;
            .borders;
            padding: 20px;
            width: 50%;
            text-align:center;
            .loginform{
                div{
                    margin:auto;
                }
                .inputbox{
                    margin:auto;
                    width: 50%;
                    padding:10px 0px 0px 0px;
                    input{
                        // 取消外边框
                        outline-style: none ;
                        margin: auto;
                        .borders;
                        padding: 14px 14px;
                        width: 200px;
                        font-size: 15px;
                        .radius;
                    }
                }
                .logbut{
                    line-height:30px;
                    cursor: pointer;
                    width: 80px;
                    font-size:17px;
                    .borders;
                    .radius;
                }
            }
            .regbox{
                padding:10px 0px 0px 0px;
                font-size:14px;
                .reg{
                    color:red;
                }
            }
        }
    }
    .error{
        color:red;
        font-size:14px;
        height: 20px;
    }
</style>