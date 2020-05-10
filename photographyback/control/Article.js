const { db } = require("../models/config")
const ArticleSchema = require("../models/Schema/article")
const Article = db.model("articles",ArticleSchema)

const UserSchema = require("../models/Schema/user")
const User = db.model("users",UserSchema)

exports.addArticle = async (ctx,next)=>{
    console.log("正在上传文章信息...")
    let obj = ctx.request.body
    let { title,  description, content, category } = obj

    const _obj = new Article({
        title,
        description,
        content,
        category,
        author: ctx.state._id,
    })

    _obj.save((err,data)=>{
        if(err){
            console.log("文章数据上传失败")
            console.log(err)
            return ctx.body = {
                "code": 400,
                "message": "上传失败",
            }
        }
    })
    console.log("文章数据上传成功")
    return ctx.body = {
        "code": 0,
        "message": "上传成功",
    }
}

// 获取文章列表
exports.articleList = async(ctx,next)=>{
    await Article.find({examine:0}).sort({_id:-1}).populate(["author","category","comment.author"]).then(data=>{
        ctx.body = {code: 0,message: data}
    })
}

// 查询文章
exports.getArticle = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.findById({_id}).populate(["author","category","comment.author"]).then(data =>{
        if(data.length == 0){
            return ctx.body = {code:400,message:"没找到"}
        }
        data.views++
        return data.save()
    }).then(data=>{
        console.log("查找成功")
        console.log(data)
        ctx.body = { code:0,message:data }     
    })
}



exports.articleLikes = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.findById({_id}).then(data => {
        if(data.length == 0){
            return ctx.body = {code:400,message:"没找到"}
        }
        data.liked++
        data.save()
        return User.findById({_id:ctx.state._id})
    }).then(data=>{
        data.likearticle.push(_id)
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:data.likearticle}
    })
}
exports.aRemoveLikes = async(ctx,next) => {
    let {_id} = ctx.request.body
    await Article.findById({_id}).then(data => {
        if(data.length == 0){
            return ctx.body = {code:400,message:"没找到"}
        }
        data.liked--
        data.save()
        return User.findById({_id:ctx.state._id})
    }).then(data=>{ 
        let index = data.likearticle.findIndex(data=>data.equals(_id))
        if(index != -1){
            data.likearticle.splice(index,1)
        }
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:data.likearticle}
    })
}





// 举报作品
exports.report = async(ctx,next)=>{
    let { _id,comment } = ctx.request.body
    let id = ctx.state._id
    await Article.findById({_id}).then(data=>{
        data.report = 1
        data.reporttext.push({
            user : id,
            comment : comment,
        })
        return data.save()      
    }).then(data=>{
        return ctx.body={code:0,message:"成功"}
    })
}

exports.searchArticle = async (ctx,next) => {
    let { title,category } = ctx.request.body
    console.log(!title)
    console.log(!!category)
    if(!title && !category){
        await Article.find({ examine:0}).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
    })
    }else if(!!title && !category){
        let r = new RegExp( title ,"gim")
        await Article.find({ title:r,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }else if(!title && !!category){
        await Article.find({ category,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }else if(!!title && !!category){
        let r = new RegExp( title ,"gim")
        await Article.find({ title:r,category,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }
}



exports.updataArticle = async(ctx,next) => {
    let { _id, title, description, category, content } = ctx.request.body
    await Article.findById({ _id }).then(data=>{
        data.title = title
        data.description = description
        data.category = category
        data.content = content
        data.examine = 1
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:"修改成功"}
    })
}
exports.delete = async(ctx,next) => {
    let { _id } = ctx.request.body
    await Article.deleteOne({_id}).then(data=>{
        console.log(data)
        return ctx.body = {code:0,message:"删除成功"}
    })
}

// 发表评论
exports.setComment = async(ctx,next)=>{
    let { comment,_id } = ctx.request.body
    console.log("正在访问评论发布路由...")
    const com = {
        comment,
        author: ctx.state._id,
        time:new Date,
    }
    console.log("正在查询文章...")
    await Article.findById({_id}).populate(["author","category"]).populate(["comment.author"]).then(data=>{
        data.comment.push(com)
        return data.save()
    }).then(data=>{
        console.log("评论保存完毕")
        return Article.findById({_id}).populate(["author","category"]).populate(["comment.author"])
    }).then(data=>{
        data.comment.reverse()
        return ctx.body = data
    })
}

// 用户文章
exports.getUserArticle = async(ctx,next)=>{
    let _id = ctx.state._id
    await Article.find({author:_id}).populate(["category"]).then(data=>{
        return ctx.body = data
    })
}
exports.getUDarticleList = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.find({author:_id,examine:0}).sort({_id:-1}).populate(["author","category"]).then((data)=>{
        return ctx.body ={code:0,message:data};
    })
}




// 审核文章列表
exports.EArticleList = async(ctx,next)=>{
    await Article.find({examine:1}).populate(["author","category"]).then(data=>{
        return ctx.body = data
    })
}
// 审核文章
exports.getEArticle = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.findById({_id}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
// 设置审核文章同意
exports.setAAdopt = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.updateOne({_id},{examine: 0},(err,data)=>{
        return ctx.body = {code:0,message:"成功"}
    })
}
// 设置审核文章不通过
exports.setAFail = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.updateOne({_id},{examine:2},(err,data)=>{
        return ctx.body = {code:0,message:"成功"}
    })
}



exports.getArticleList = async(ctx,next)=>{
    await Article.find().sort({_id:-1}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.getArticleA = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Article.findById({_id}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.deleArticle = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Article.deleteOne({ _id }).then(data => {
        if(data.ok === 1){
            return ctx.body = { code:0,message:"删除成功"}
        }
        return ctx.body = { code:400,message:"删除失败" }
    }).catch(err=>{
        console.log(err)
        ctx.body = {message:"服务器出错"}
    })
}


exports.getRArticleList = async (ctx,next) => {
    await Article.find({report:1}).populate(["author","category","reporttext.user"]).then(data=>{
        return ctx.body = { code:0,message:data }
    })
}
exports.getRArticle = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Article.findById({ _id }).populate(["author","category"]).then(data=>{
        return ctx.body = { code:0,message:data }
    })
}
exports.RArticleAdopt = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Article.updateOne({ _id },{ report:0,reporttext:[] }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"举报审核成功" }
        }
    })
}
exports.RArticleFail = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Article.updateOne({ _id },{ report:2 }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"举报审核成功" }
        }
    })
}