<template>
    <div class="add-works">
        <Errorbox v-if="errorshow" @errorClose="errorClose" :errormessage="errormessage"></Errorbox>
        <Successbox v-if="successshow" @successClose="successClose" :successmessage="successmessage"></Successbox>
        <div class="leftBodys">
            <ul>
                <li class="as" @dragover="resetEvent($event)" @drop="PhotoVerification">选择照片</li>
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
            
                
            
            <div class="buttons" @click="submit">发布</div>
        </div>
    </div>
</template>

<script>
import { addWorks,getCategory } from "@/api"
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
    },
    methods:{
        // 获取作品分类列表
        async categoryList(){
            console.log("正在获取作品分类列表")
            let data = await getCategory()
            console.log("获取到作品分类列表")
            this.categoryArr = data
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

        // 添加照片框
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
                console.log("正在验证文件类型...")
                if(/image/.test(type)){
                    console.log("文件类型通过")
                    // 校验大小
                    console.log("正在验证文件大小...")
                    if(file.size / 1024 / 1024 <= that.filesize){
                        console.log("文件大小通过")
                        console.log("正在创建img标签")
                        let li = document.createElement("li")
                        const img = new Image();
                        img.src = read.result
                        img.onload = function(){
                            console.log("正在获取图片宽高")
                            let width = img.width
                            let height = img.height
                            let proportion = (width / height).toFixed(2)
                            img.height = 224
                            img.width = 224 * proportion
                            console.log("正在等比例缩放")
                            li.appendChild(img)
                            tag.parentNode.insertBefore(li,tag)
                            that.param.append('file', file, file.name)
                            console.log("img标签添加成功")
                            console.log("正在删除添加框")
                            tag.parentNode.removeChild(tag)

                            console.log("添加框删除成功")
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

        // 提交
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
            if(!this.param.get("file")){
                this.errorshow = true
                this.errormessage = "请上传一张照片！"
                return
            }
            console.log("信息校验完成")
            console.log("正在提交中...")
            // let param = new FormData() 
            //创建form对象，添加form表单中其他数据，通过append向form对象添加数据,用get取数据
            this.param.append('title', this.title)
            this.param.append('description', this.description)
            this.param.append('category', this.category)
            // console.log(this.param.get("title"))
            let data = await addWorks(this.param)
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
            this.$router.go(0);
        },
        // down(){
        //     this.successshow = false
        //     this.$router.go(-1)
        // }
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