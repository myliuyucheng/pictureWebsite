const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://localhost:27017/photography",{useNewUrlParser:true})
db.on("error", () => {
    console.log("数据库连接失败")
})
db.on("open", () => {
    console.log("数据库连接成功")
})

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema

module.exports = {
    db,
    Schema,
}