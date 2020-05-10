const { Schema } = require("../config")

const Category = new Schema({
    name: String,
},{versionKey:false})

module.exports = Category