const { Schema } = require("../config")

const Acategory = new Schema({
    name: String,
},{versionKey:false})

module.exports = Acategory