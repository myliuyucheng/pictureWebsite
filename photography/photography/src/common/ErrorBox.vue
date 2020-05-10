<template>
    <div class="error-box">
        <div class="error">
            <div class="error-title">
                <div class="et-left">错误</div><div class="et-right" @click="close">X</div>
            </div>
            <div class="error-content">{{errormessage}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        errormessage: {
            type: String,
            default: "",
        },
    },
    methods: {
        close(){
            this.$emit("errorClose")
        },
    },
}
</script>

<style lang="less" scope>
    .error-box{
        position: absolute;
        top:0;
        z-index: 99999;
        width: 100%;
        height: 100%;
        background-color:rgba(192, 192, 192, 0.5);
        .error{
            position: absolute;
            top: 50%;
            left:50%;
            margin-top:-50px;
            margin-left:-150px;
            width: 300px;
            padding: 10px;
            border-radius: 5px;
            background-color:#fff;
            text-align: center;
            color:#000;
            .error-title{
                box-sizing: border-box;
                text-align: left;
                padding:5px 10px;
                overflow: hidden;
                .et-left{
                    float:left;
                    font-size: 20px;
                }
                .et-right{
                    float:right;
                    cursor: pointer;
                }
            }
            .error-content{
                box-sizing: border-box;
                padding:20px;
                margin-bottom: 10px;
            }
        }
    }
</style>