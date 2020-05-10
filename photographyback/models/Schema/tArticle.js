const { Schema } = require("../config")


const TipsArticlesSchema = new Schema({
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
            ref: "tcategorys",
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
    comment: {
        type: Array,
        default: [],
    }
},{versionKey:false})

module.exports = TipsArticlesSchema