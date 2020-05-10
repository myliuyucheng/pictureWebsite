const { db } = require("../models/config")
const AcategorySchema = require("../models/Schema/aCategory")
const Acategory = db.model("acategorys",AcategorySchema)

exports.acategoryList = async (ctx,next)=>{
    await Acategory.find().then(data=>{
        console.log(data)
        ctx.body = data
    })

}



exports.getAcategoryList = async(ctx,next) => {
    await Acategory.find().sort({_id:-1}).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.setAcategory = async(ctx,next) => {
    let { _id,name } = ctx.request.body
    await Acategory.updateOne({ _id },{ name }).then(data=>{
        if(data.ok == 1){
            return ctx.body = { code:0,message:"修改成功" }
        }
        return ctx.body = { code:400,message:"修改失败" }
    })
}
exports.addAcategory = async(ctx,next) => {
    let { name } = ctx.request.body
    const news = new Acategory({name})
    await news.save().then(data=>{
        return ctx.body = {code:0,message:"添加成功"}
    }).catch(err=>{
        console.log(err)
        return ctx.body = {code:400,message:"添加数据出错"}
    })
}
exports.deleAcategory = async(ctx,next) => {
    let { _id } = ctx.request.body
    await Acategory.deleteOne({ _id }).then(data=>{
        return ctx.body = { code:0,message:"删除成功" }
    }).catch(err=>{
        return ctx.body = { code:400,message:"删除数据失败" }
    })
}