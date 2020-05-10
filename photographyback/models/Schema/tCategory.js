const { Schema } = require("../config")

const TipsCategorySchema = new Schema({
    // 分类标题
    name: String,
},{versionKey:false})

module.exports = TipsCategorySchema