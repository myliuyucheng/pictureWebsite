<template>
    <div class="add-works">
        <Errorbox v-if="errorshow" :errormessage="errormessage" @errorClose="errorClose"></Errorbox>
        <Successbox v-if="successshow" :successmessage="successmessage" @successClose="successClose"></Successbox>
        <div class="g-leftBody">
            <ul>
                <li class="g-a" @dragover="resetEvent($event)" @drop="PhotoVerification">选择照片</li>
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
            
                
        
            <div class="g-button" @click="submit">发布</div>
        </div>
    </div>
</template>

<script>
import { addGworks,getCategory } from "@/api"
import Errorbox from "@/common/ErrorBox"
import Successbox from "@/common/SuccessBox"

export default {
    data (){
        return {
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
    },
    methods:{
        // 请求作品分类列表
        async categoryList(){
            console.log("正在请求作品分类列表...")
            let data = await getCategory()
            this.categoryArr = data
            console.log("请求到作品分类列表")
        },

        // 阻止默认事件
        resetEvent(e){
            // 不写括号时可以直接用E,写了括号必须写$event才能用E
            // 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
            e.stopPropagation();
            // 阻止默认事件，这样drop才可以用
            e.preventDefault();
            return false;
        },

        // 处理文件数据
        PhotoVerification(e){
            console.log("正在对拖过来的数据进行分析")
            // 获得拖过来的数据
            const dt = e.dataTransfer
            // 文件信息
            const file = dt.files.item(0)
            // 读取文件信息
            const read = new FileReader()
            read.readAsDataURL(file)
            // 获取文件类型MIME
            let type = file.type
            // 获取vue的this
            let that = this
            // 触发事件的标签
            let tag = e.currentTarget
            // 文件加载,对照片进行校验
            read.onload =async function(e){
                // 里面的this时file
                // 校验格式
                console.log("正在校验文件类型...")
                if(/image/.test(type)){
                    console.log("文件类型校验通过")
                    // 校验大小
                    console.log("正在校验文件大小...")
                    if(file.size / 1024 / 1024 < that.filesize){
                        console.log("文件大小校验通过")
                        // 创建标签添加标签
                        console.log("正在创建img标签")
                        let li = document.createElement("li")
                        const img = new Image();
                        img.src = read.result
                        img.onload = function(){
                            console.log("正在获取图片宽高...")
                            let width = img.width
                            let height = img.height
                            console.log("正在等比例缩放...")
                            let proportion = (width / height).toFixed(2)
                            img.height = 224
                            img.width = 224 * proportion
                            li.appendChild(img)
                            tag.parentNode.insertBefore(li,tag)
                            that.param.append('file[]', file, file.name)
                            console.log("img标签添加成功")
                        }
                    }else{
                        console.log("文件大小错误")
                        that.errorshow = true
                        that.errormessage = `图片选择失败，每张图片大小不能超过 ${that.filesize}MB,请重新选择!`
                    }

                }else{
                    console.log("文件类型错误")
                    that.errorshow = true
                    that.errormessage = "不是img格式"
                }
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
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
            if(this.param.getAll("file[]").length < 2){
                this.errorshow = true
                this.errormessage = "请上传1张以上的照片！"
                return
            }
            console.log("信息校验完成")
            console.log("正在提交中...")
            this.param.append('title', this.title)
            this.param.append('description', this.description)
            this.param.append('category', this.category)
            let data = await addGworks(this.param)
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
            this.$router.go(0);
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