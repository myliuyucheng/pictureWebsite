const { db } = require("../models/config")
const CategorySchema = require("../models/Schema/category")
const Category = db.model("categorys",CategorySchema)

exports.CategoryList = async (ctx,next) => {
    await Category.find().then((data)=>{
        console.log(data)
        return ctx.body = data
    })
}

exports.getCategoryList = async(ctx,next) => {
    await Category.find().sort({_id:-1}).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.setCategory = async(ctx,next) => {
    let { _id,name } = ctx.request.body
    await Category.updateOne({ _id },{ name }).then(data=>{
        if(data.ok == 1){
            return ctx.body = { code:0,message:"修改成功" }
        }
        return ctx.body = { code:400,message:"修改失败" }
    })
}
exports.addCategory = async(ctx,next) => {
    let { name } = ctx.request.body
    const news = new Category({name})
    await news.save().then(data=>{
        console.log(data)
        return ctx.body = {code:0,message:"添加成功"}
    }).catch(err=>{
        console.log(err)
        return ctx.body = {code:400,message:"添加数据出错"}
    })
}
exports.deleCategory = async(ctx,next) => {
    let { _id } = ctx.request.body
    await Category.deleteOne({ _id }).then(data=>{
        console.log(data)
        return ctx.body = { code:0,message:"删除成功" }
    }).catch(err=>{
        return ctx.body = { code:400,message:"删除数据出错"}
    })
}