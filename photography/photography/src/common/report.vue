<template>
    <div class="report-template">
        <div class="report-box">
            <div class="re-box-title"><span class="re-title">举报</span><span class="re-close" @click="close">X</span></div>
            <div class="re-box-content"><textarea name="" id="" cols="30" rows="10" placeholder="举报详情" v-model="comment"></textarea></div>
            <div class="re-box-but"><div class="button" @click="report">举报</div></div>
        </div>

    </div>
</template>

<script>
import { wReport,gReport,aReport } from "@/api"

export default {
    data(){
        return{
            comment: "",
        }
    },
    props:["id","type"],
    methods: {
        async report(){
            let data
            if(this.type === "works"){
                data = await wReport(this.id,this.comment)
            }else if(this.type === "gworks"){
                data = await gReport(this.id,this.comment)
            }else if(this.type === "article"){
                data = await aReport(this.id,this.comment)
            }
            this.$emit("reData",data)
        },
        close(){
            this.$emit("reClose")
        }
    }

}
</script>

<style lang="less" scope>
    .report-template{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        background:rgba(0,0,0,0.5);
        .report-box{
            position: relative;

            top: 50%;
            margin:auto;
            margin-top:-100px;
            width: 250px;
            // height: 100px;
            background:#Fff;
            padding:10px 10px;
            .re-box-title{
                font-size:20px;
                margin-bottom: 10px;
                overflow: hidden;
                .re-title{
                    float: left;
                }
                .re-close{
                    float:right;
                    cursor: pointer;
                }
            }
            .re-box-content{
                text-align: center;
                textarea{
                    resize:none;
                    width: 200px;
                    height: 100px;
                }
            }
            .re-box-but{
                margin: 10px 0px;
                text-align: center;
                .button{
                    cursor: pointer;
                    display: inline-block;
                    padding: 5px;
                    background: rgb(64,158,255);
                    color:#fff;
                    border-radius: 5px;
                }
                .button:hover{
                    background: rgb(64,158,200)
                }
            }
        }
    }
</style>