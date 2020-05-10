<template>
    <div class="add-works">
        <Errorbox v-if="errorshow" :errormessage="errormessage" @errorClose="errorClose"></Errorbox>
        <Successbox v-if="successshow" :successmessage="successmessage" @successClose="successClose"></Successbox>
        <div class="g-leftBody">
            <ul>
                <li v-for="(value,index) in url" :key="index"><img :src="value|setUrl" alt="" style="width:80%"></li>
            </ul>
        </div>
        <div class="g-rightBody">
            <div class="text">需要提交2-100张照片，每张图大小不超过{{filesize}}MB</div>
            <div class="g-databody">
                <div class="g-label">标题</div>
                <input type="text" v-model="title">
            </div>
            <div class="g-databody">
                <div class="g-label">简介</div>
                <textarea name="" id=""  v-model="description" placeholder="分享镜头背后的故事"></textarea>
            </div>
            <div class="g-databody">
                <div class="g-label">分类</div>
                <div class="gw-select">
                    <select name="" id="" v-model="category">
                        <option value="未分类">未分类</option>
                        <option v-for="(value,index) in categoryArr" :key="index" :value="value._id">{{value.name}}</option>
                    </select>
                </div>
            </div>
            
                
        
            <div class="g-button" @click="submit">更改信息</div>
        </div>
    </div>
</template>

<script>
import { updataGworks,getCategory,getGWorks } from "@/api"
import Errorbox from "@/common/ErrorBox"
import Successbox from "@/common/SuccessBox"

export default {
    data (){
        return {
            data: [],
            id: this.$route.params.id,
            url: [],
            title: "",
            description: "",
            param: new FormData(),
            category: "未分类",
            categoryArr: [],
            filesize: 10,

            errorshow: false,
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
        // 请求作品分类列表
        async categoryList(){
            console.log("正在请求作品分类列表...")
            let data = await getCategory()
            this.categoryArr = data
            console.log("请求到作品分类列表")
        },

 
        async get(){
            let data = await getGWorks({_id:this.id})
            this.title = data.message.title
            this.description = data.message.description 
            this.category = data.message.category._id
            this.url = data.message.url
        },
        

        // 提交表单
        async submit(){
            console.log("正在校验信息中...")
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
            let data = await updataGworks({
                _id: this.id,
                title: this.title,
                description: this.description,
                category: this.category,
            })
            if(data.code == 0){
                console.log(data)
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
        Errorbox,
        Successbox,
    }
}
</script>

<style lang="less" scope>
    .g-label{
        font-size: 16px;
        font-weight: 600;
        color: #222;
        line-height: 1.25;
        margin-bottom: 8px;
    }
    .gw-select{
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
    .g-a{
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
        .g-leftBody{
            box-sizing: border-box;
            height: 100%;
            padding:50px;
            width: calc(100% - 360px);
            float:left;
            overflow-y: scroll;
            ul{
                li{
                    float:left;
                    margin: 0px 30px;
                }
            }
        }
        .g-rightBody{
            box-sizing: border-box;
            float:right;
            height: 100%;
            width: 360px;
            padding: 24px 20px;
            overflow: auto;
            background:#fff;
            .g-databody{
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
            .g-button{
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