<template>
    <div class="register">
        <div class="regbox">
            <h1>注册</h1>
            <div class="regform">
                <div class="inputbox">
                    <div style="width:50px;height:50px;border-radius:50%;background-color:red;overflow:hidden" ref="img"></div>
                    <div class="touxiangbox">
                        <input type="file" value="上传头像" class="touxiang" ref="fils" @change="head">
                        <div class="touxiangbut">上传头像</div>
                    </div>
                    <div class="error">{{headError}}</div>
                </div>
                <div class="inputbox">
                    <input type="text" v-model="name" placeholder="用户名" @blur="nameCheck">
                    <div class="error">{{nameError}}</div>
                </div>
                <div class="inputbox">
                    <input type="text" v-model="username" placeholder="账号" @blur="usernameCheck">  
                    <div class="error">{{usernameError}}</div>              
                </div>
                <div class="inputbox">
                    <input type="password" v-model="password" placeholder="密码" @blur="passwordCheck">
                    <div class="error">{{passwordError}}</div>
                </div>
                <div class="inputbox">
                    <input type="password" v-model="repassword" placeholder="确定密码" @blur="repasswordCheck">
                    <div class="error">{{repasswordError}}</div>
                </div>
                <div class="error">{{error}}</div>
                <div class="regbut" @click="register">注册</div>
            </div>
            <div class="logbox">
                已有账号？
                <router-link to="/login" class="log">请登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
// 导入注册api
import { register } from "@/api"

export default {
    data() {
        return {
            name: "",
            username: "",
            password: "",
            repassword: "",

            check: [false,false,false,false,false],

            nameError: "",
            usernameError: "",
            passwordError: "",
            repasswordError: "",
            headError: "",

            error: "",
            filesize: 2,
        }
    },
    created(){
        console.log(this._data)
    },
    methods: {
        // 注册按钮
        async register(){
            let name = this.name
            let username = this.username
            let password = this.password
            let repassword = this.repassword
            // 是否表单通过了验证
            if(this.check.every(value=>value)){
                let data = await register({name,username,password})
                this.error = ""
                return this.error = data.message
            }

            this.error = "请填写完信息"
        },

        // 名字校验
        nameCheck(){
            let name = this.name
            this.check[0] = false

            if(name.length === 0){
                return this.nameError = "用户名不能为空"
            }else if(name.length > 10){
                return this.nameError = "用户名长度不能超过9个字符"
            }
            this.check[0] = true
            return this.nameError = ""
        },

        // 账号校验
        usernameCheck(){
            let username = this.username
            this.check[1] = false

            // 账号验证
            let usernames = /^[a-zA-Z]{1}[a-zA-Z0-9]{7,14}$/
            if(username.length == 0){
                return this.usernameError = "账号不能为空"
            }else if(!usernames.test(username)){
                return this.usernameError = "账号必须以字母开头,长度为8-15个字符"
            }
            this.check[1] = true
            return this.usernameError = ""
        },

        // 密码校验
        passwordCheck(){
            let password = this.password
            this.check[2] = false

            // 密码验证
            let passwords = /^[a-z+A-Z+0-9+]{6,15}$/
            if(password.length == 0){
                return this.passwordError = "密码不能为空"
            }else if(!passwords.test(password)){
                return this.passwordError = "密码长度为6-15个字符"
            }
            this.check[2] = true
            return this.passwordError = ""
        },

        // 确定密码校验
        repasswordCheck(){
            let repassword = this.repassword
            let password = this.password
            this.check[3] = false

            if(password !== repassword){
                return this.repasswordError = "两次密码不同"
            }
            this.check[3] = true
            return this.repasswordError = ""
        },

        // 上传头像按钮
        head(e){
            let file = this.$refs.fils.files[0]
            console.log(file)
            let type = file.type
            const read = new FileReader()
            read.readAsDataURL(file)
            // 获取vue的this
            let that = this
            // 触发事件的标签
            let tag = e.currentTarget
            // 文件加载,对照片进行校验
                // 校验格式
            console.log("正在验证文件类型...")
            read.onload =async function(e){
                if(/image/.test(type)){
                    console.log("文件类型通过")
                    // 校验大小
                    console.log("正在验证文件大小...")
                    if(file.size / 1024 / 1024 <= that.filesize){
                        console.log("文件大小通过")
                        console.log("正在创建img标签")
                        const img = new Image();
                        img.src = read.result
                        img.height = 60
                        img.width = 60
                        img.onload = function(){
                            if(that.$refs.img.firstChild){
                                console.log(that.$refs.img.firstChild)
                                that.$refs.img.removeChild(that.$refs.img.firstChild)
                            }
                            that.$refs.img.appendChild(img)
                            console.log("img标签添加成功")
                            that.headError = ""
                            that.check[4] = true
                        }
                    }else{
                        console.log("文件大小错误")
                        that.headError = "文件大小错误"
                    }
                }else{
                    console.log("文件类型错误")
                    that.headError = "文件类型错误"
                }
            }
        }
    },
}
</script>

<style lang="less" scope>
    .radius{
        border-radius: 5px;
    }
    .borders{
        border: 1px solid #999; 
    }

    .register{
        .regbox{
            margin:100px auto;
            .borders;
            .radius;
            padding: 20px;
            width: 50%;
            text-align:center;
            .regform{
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
                    .touxiangbox{
                        position: relative;
                        // overflow: hidden;
                        height: 40px;
                        .touxiang{
                            position: absolute;
                            opacity: 0;
                            left: 0;
                            z-index: 10;
                            width: 100%;
                            cursor: pointer;
                        }
                        .touxiangbut{
                            position: absolute;
                            top:0px;
                            width: 100%;
                            text-align: center;
                            
                        }
                    }
                }
                .regbut{
                    line-height:30px;
                    cursor: pointer;
                    font-size:17px;
                    width: 80px;
                    .borders;
                    .radius;
                }
            }
            .logbox{
                padding:10px 0px 0px 0px;
                font-size:14px;
                .log{
                    color:red;
                }
            }
        }
        .error{
            color:red;
            font-size:14px;
            height: 20px;
        }
    }
</style>