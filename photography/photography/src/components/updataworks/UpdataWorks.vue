<template>
    <div class="add-works">
        <Errorbox v-if="errorshow" @errorClose="errorClose" :errormessage="errormessage"></Errorbox>
        <Successbox v-if="successshow" @successClose="successClose" :successmessage="successmessage"></Successbox>
        <div class="leftBodys">
            <ul>
                <li><img :src="url|setUrl" alt="" style="width:70%;"></li>
            </ul>
        </div>
        <div class="rightBodys">
            <div class="text">需要提交1张照片，每张图大小不超过{{filesize}}MB</div>
            <div class="databodys">
                <div class="labels">标题</div>
                <input type="text" v-model="title">
            </div>
            <div class="databodys">
                <div class="labels">简介</div>
                <textarea name="" id=""  v-model="description" placeholder="分享镜头背后的故事"></textarea>
            </div>
            <div class="databodys">
                <div class="labels">分类</div>
                <div class="w-select">
                    <select name="" id="" v-model="category">
                        <option value="未分类">未分类</option>
                        <option v-for="(value,index) in categoryArr" :key="index" :value="value._id">{{value.name}}</option>
                    </select>
                </div>
            </div>
            
            <div class="buttons" @click="submit">更改信息</div>
        </div>
    </div>
</template>

<script>
import { getWorks,getCategory,updataWorks } from "@/api"
import Errorbox from "@/common/ErrorBox"
import Successbox from "@/common/SuccessBox"

export default {
    data (){
        return {
            data: [],
            id: this.$route.params.id,
            title: "",
            description: "",
            param: new FormData(),
            category: "未分类",
            url: "",
            categoryArr: [],
            // 文件大小上限
            filesize: 10,
            // 错误窗口
            errorshow: false,
            // 错误信息
            errormessage: "",
            successshow: false,
            successmessage: "",
        }
    },
    created(){
        this.categoryList()
        this.get()
    },
    filters:{
        setUrl(value){
            return "http://localhost:8085/"+value
        }
    },
    methods:{
        // 获取作品分类列表
        async categoryList(){
            console.log("正在获取作品分类列表")
            let data = await getCategory()
            console.log("获取到作品分类列表")
            this.categoryArr = data
        },
        async get(){
            let data = await getWorks(this.id)
            console.log(data)
            this.title = data.message.title
            this.description = data.message.description 
            this.category = data.message.category._id
            this.url = data.message.url
        },


        // 提交
        async submit(){
            if(!this.title.trim()){
                this.errorshow = true
                this.errormessage = "标题不能为空！"
                return
            }
            if(!this.description.trim()){
                this.errorshow = true
                this.errormessage = "简介不能为空！"
                return
            }
            console.log("信息校验完成")
            console.log("正在提交中...")
            // let param = new FormData() 
            //创建form对象，添加form表单中其他数据，通过append向form对象添加数据,用get取数据
            let data = await updataWorks({
                _id: this.id,
                title: this.title,
                description: this.description,
                category: this.category,
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

        // 关闭错误窗口
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
        Errorbox,
        Successbox,
    }
}
</script>

<style lang="less" scope>
    .text{
        font-size:13px;
        text-align: center;
        margin-bottom: 10px;
    }
    .labels{
        font-size: 16px;
        font-weight: 600;
        color: #222;
        line-height: 1.25;
        margin-bottom: 8px;
    }
    .w-select{
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
    .as{
        width: 222px;
        line-height: 222px;
        border:2px solid #B9C1C7;
        color: #b9c1c7;
        font-weight: 400;
        text-align: center;
    }
    .add-works{
        height: calc(100% - 41px);
        width: 100%;
        .leftBodys{
            box-sizing: border-box;
            padding:50px;
            height: 100%;
            float:left;
            width: calc(100% - 360px);
            overflow-y: scroll;
        }
        .rightBodys{
            box-sizing: border-box;
            overflow: auto;
            height: 100%;
            width: 360px;
            padding: 24px 20px;
            overflow: auto;
            background:#fff;
            .databodys{
                margin-bottom: 32px;
            }
            input{
                box-sizing: border-box;
                width: 100%;
                padding: 8px 10px;
                border: 1px solid rgba(185,193,199,.5);
                border-radius: 3px;
            }
            textarea{
                box-sizing: border-box;
                width: 100%;
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                line-height: 1.5;
                background-color: #fff;
                height: 106px;
                resize: none;
                padding: 10px;
                border-radius: 3px;
            }
            .buttons{
                box-sizing: border-box;
                height: 48px;
                line-height: 48px;
                font-size: 18px;
                text-align: center;
                width: 312px;
                border-radius: 24px;
                margin-bottom: 12px;
                background: #1890ff;
                font-weight: 700;
                color: #fff;
                cursor: pointer;
            }
        }
        
    }
    .add-works::after{
        content:"";
        clear:both;
    }
    
</style>