<template>
    <div class="add-article">
        <Errorbox v-if="errorshow" :errormessage="errormessage" @errorClose="errorClose"></Errorbox>
        <Successbox v-if="successshow" :successmessage="successmessage" @successClose="successClose"></Successbox>

        <div class="art-left">
            <div class="art-left-body">
                <div class="art-body">
                    <div class="label">标题</div>
                    <input type="text" v-model="title" placeholder="添加标题">
                </div>
                <div class="art-body">
                    <div class="label">描述</div>
                    <textarea name="" id="" cols="30" rows="10" v-model="description" placeholder="分享镜头背后的故事"></textarea>
                </div>
                <div class="art-body">
                    <div class="label">内容</div>
                    <Wangeditor :catchData="catchData" :content="content"></Wangeditor>
                </div>
            </div> 
        </div>

        <div class="art-right">
            <div class="art-right-body">
                <div class="databody">
                    <div class="label">标签</div>
                    <div class="select_wrap">
                        <select name="" id="" v-model="category">
                            <option value="未分类">未分类</option>
                            <option v-for="(value,index) in acategoryLists" :key="index" :value="value._id">{{value.name}}</option>
                        </select>
                    </div>
                </div>
                <div @click="submit" class="button databody">更改信息</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Wangeditor from "@/common/wangeditor"

import Errorbox from "@/common/ErrorBox"
import Successbox from "@/common/SuccessBox"
import { updataArticle,getAcategory,getArticle } from "@/api"
export default {
    data() {
        return {
            data: [],
            id: this.$route.params.id,

            title: "",
            description: "",
            content: "",
            contents: "",
            acategoryLists: [],
            category: "",


            errorshow: false,
            errormessage: "",
            successshow: false,
            successmessage: "",
        }
    },
    created(){
        this.get()
        this.acategoryList()
    },
    methods:{
        // 富文本返回数据
        catchData(html){
            console.log(html)
            this.contents = html
        },
        // 获取分类列表
        async acategoryList(){
            let data = await getAcategory()
            this.acategoryLists = data
        },
        async get(){
            let data = await getArticle(this.id)
            this.title = data.message.title
            this.description = data.message.description 
            this.category = data.message.category._id
            this.content = data.message.content
        },

        // 提交
        async submit(){
            let title = this.title
            let description = this.description
            let content = this.content
            let category = this.category
            let data = await updataArticle({
                _id: this.id,
                title: this.title,
                description: this.description,
                category: this.category,
                content: this.contents,
                })
            if(data.code == 0){
                console.log("上传成功")
                this.successshow = true
                this.successmessage = data.message
            }else{
                console.log("上传失败")
                this.errorshow = true
                this.errormessage = data.message
            }
        },


        errorClose(){
            this.errorshow = false
            this.$router.go(0);
        },
        successClose(){
            this.successshow = false
            this.$router.go(-1);
        },
    },
    components: {
        Wangeditor,
        Errorbox,
        Successbox,
    }
}
</script>

<style lang="less" scope>
    .label{
        font-size: 20px;
        font-weight: 600;
        color: #222;
        line-height: 1.25;
        margin-bottom: 8px;
    }
    .databody{
        margin-bottom: 32px;
    }
    .art-body{
        margin-bottom:20px;
    }
    // 提交按钮样式
    .button{
        box-sizing:border-box;
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        text-align: center;
        border-radius: 24px;
        margin-bottom: 12px;
        background: #1890ff;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }

    .add-article{
        height: calc(100% - 41px);
        .art-left{        
            overflow-y:scroll ;
            box-sizing: border-box;
            float:left;
            height: 100%;
            width: calc(100% - 360px);
            padding:20px;
            .art-left-body{
                margin:0 auto;
                max-width: 671px;
                text-align: center;
                input{
                    box-sizing: border-box;
                    width: 100%;
                    padding: 8px 10px;
                    border: 1px solid rgba(185,193,199,.5);
                    border-radius: 3px;
                }
                textarea{
                    box-sizing: border-box;
                    color: rgba(0, 0, 0, 0.65);
                    font-size: 14px;
                    line-height: 1.5;
                    background-color: #FFFFFF;
                    height: 106px;
                    width: 100%;
                    resize: none;
                    padding: 10px;
                    border-radius: 3px;
                }
            }
        }
        .art-right{
            overflow: auto;
            width: 360px;
            .art-right-body{
                box-sizing:border-box;
                padding:40px;
                .select_wrap{
                    height: 40px;
                    select{
                        height: 100%;
                        color: #525558;
                        border: 1px solid rgba(185,193,199,.5);
                        background-color: #fff;
                        width: 100%;
                        padding: 6px 30px 6px 10px;
                        font-size: 14px;
                    }
                }
            }
        }
    
        
    }
</style>