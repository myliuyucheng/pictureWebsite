const { Schema } = require("../config")

const SwiperSchema = new Schema({
    // 路径
    url: String,
},{versionKey:false})

module.exports = SwiperSchema