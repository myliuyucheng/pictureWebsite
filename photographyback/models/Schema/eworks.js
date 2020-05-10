const { Schema } = require("../config.js")

const EWorksSchema = new Schema({
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
    url: {
        type: String,
    }
},{versionKey:false})

module.exports = EWorksSchema