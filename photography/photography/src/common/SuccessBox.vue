<template>
    <div>
        <div class="success-box">
            <div class="success">
                <div class="success-title">
                    <div class="st-left">成功</div><div class="st-right" @click="close">X</div>
                </div>
                <div class="success-content">{{successmessage}}</div>
                <!-- <div class="success-button" @click="PressDown">确定</div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        successmessage: {
            type: String,
            default: "",
        },
    },
    created(){
        console.log(this.successmessage)
    },
    methods: {
        close(){
            this.$emit("successClose")
        },

        PressDown(){
            this.$emit("down")
        }
    },
}
</script>

<style lang="less" scope>
    .success-box{
        position: absolute;
        top:0;
        z-index: 99999;
        width: 100%;
        height: 100%;
        background-color:rgba(192, 192, 192, 0.5);
        .success{
            position: absolute;
            top: 50%;
            left:50%;
            margin-top:-50px;
            margin-left:-150px;
            width: 300px;
            padding: 10px;
            border-radius: 5px;
            padding-bottom: 20px;
            background-color:#fff;
            text-align: center;
            .success-title{
                box-sizing: border-box;
                text-align: left;
                padding:5px 10px;
                overflow: hidden;
                .st-left{
                    float:left;
                    font-size: 20px;
                }
                .st-right{
                    float:right;
                    cursor: pointer;
                }
            }
            .success-content{
                box-sizing: border-box;
                padding:20px;
                margin-bottom: 10px;
            }
            .success-button{
                display: inline-block;
                cursor: pointer;
                padding: 5px 15px;
                background: #409eff;
                border-radius: 4px;
                text-align: center;
                color: #fff;
            }
            .success-button:hover{
                background: #ee0099;
            }
        }
    }
</style>