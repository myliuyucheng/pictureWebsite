const { Schema } = require("../config")

const Article = new Schema({
    // 内容标题
    title: String,
    // 内容简介
    description: String,
    // 内容主体
    content: String,
    // 作者
    author: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    // 内容分类
    category: {
        // type: [{
            type: Schema.Types.ObjectId,
            ref: "acategorys",
        // }],
    },
    // 文章发表时间
    time: {
        type: Date,
        default: new Date(),
    },
    // 文章阅读量
    views: {
        type: Number,
        default: 0,
    },
    // 文章评论
    comment: [{
        comment: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        time: {
            type: Date,
            default: new Date(),
        },
    }],
    // 审核
    examine:{
        type: Number,
        default: 1,
    },
    // 举报
    report: {
        type: Object,
        default: 0,
    },
    // 举报内容
    reporttext: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        comment: {
            type: String,
            default: "",
        },
    }]
},{versionKey:false})

module.exports = Article