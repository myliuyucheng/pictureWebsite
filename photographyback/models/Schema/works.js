const { Schema } = require("../config.js")

const WorksSchema = new Schema({
    // 内容标题
    title: String,
    // 内容简介
    description: String,
    // 分类
    category: {
        type: Schema.Types.ObjectId,
        ref: "categorys",
    },
    // 作者
    author: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    // 作品发表时间
    time: {
        type: Date,
        default: new Date(),
    },
    // 作品阅读量
    views: {
        type: Number,
        default: 0,
    },
    // 作品评论
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
    // 喜欢数
    liked: {
        type: Number,
        default: 0,
    },
    url: {
        type: String,
    },
    // 审核
    examine: {
        type: Number,
        default: 1,
    },
    // 举报
    report: {
        type: Number,
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

module.exports = WorksSchema