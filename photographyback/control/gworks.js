const { db } = require("../models/config")
const GworksSchema = require("../models/Schema/gWorks")
const Gworks = db.model("gworks",GworksSchema)
const UserSchema = require("../models/Schema/user")
const User = db.model("users",UserSchema)

const fs = require('fs');
const path = require('path');



// 添加作品组
exports.addGworks = async (ctx, next)=>{
    console.log("正在上传作品组...")
    console.log("正在保存照片组...")
    // 获取文字信息
    const { title,description,category } = ctx.request.body
    console.log(category)
    let urls = []
    // 获取文件
    const files = ctx.request.files["file[]"];
    files.forEach(file => {
        // 取出扩展名
        const extname = path.extname(file.name);
        let url = `public/image/${Math.random().toString(36).substr(2)}${extname}`
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(
            url
        );
        reader.pipe(writer);
        // 计算路径
        urls.push(url.substr(7)) 
    });
    console.log("照片保存完成")
    
    
    // 保存信息
    console.log("正在上传数据库...")
    const _Gworks = new Gworks({
        title,
        description,
        category,
        url: urls,
        author: ctx.state._id,
    })
    _Gworks.save((err,data)=>{
        if(err){
            console.log("上传失败")
            console.log(err)
            return ctx.body = {
                "code": 400,
                "message": "上传失败",
            }
        }
    })
    console.log("数据库上传完成")
    console.log("作品上传完成")
    return ctx.body = {
        "code": 0,
        "message": "上传成功"
    }

}

// 作品集列表
exports.gworksList = async(ctx,next)=>{
    await Gworks.find({examine:0}).sort({_id:-1}).populate(["author","category"]).then(data=>{
        return ctx.body = data
    })
}
// 查询作品
exports.getGWorks = async(ctx,next)=>{
    let { _id } = ctx.request.body
    console.log(_id)
    await Gworks.findById({_id}).populate(["author","category","comment.author"]).then(data =>{
        if(data.length == 0)return ctx.body = {code:400,message:"没找到"}
        data.views++
        return data.save()
        console.log(data)
    }).then(data=>{
        data.comment.reverse()
        ctx.body = { code:0,message:data }
    })
}
// 发表评论
exports.setComment = async(ctx,next)=>{
    let { comment,_id } = ctx.request.body
    console.log("正在访问评论发布路由...")
    console.log(ctx.state._id)
    const com = {
        comment,
        author: ctx.state._id,
        time:new Date,
    }
    console.log("正在查询文章...")
    await Gworks.findById({_id}).populate(["author","category","comment.author"]).then(data=>{
        data.comment.push(com)
        return data.save()
    }).then(data=>{
        return Gworks.findById({_id}).populate(["author","category","comment.author"])
    }).then(data=>{
        data.comment.reverse()
        console.log(data.comment)
        return ctx.body = data
    })
}
// 点击喜欢
exports.gworksLikes = async(ctx,next)=>{
    let { _id } = ctx.request.body
    console.log(_id)
    await Gworks.findById({_id}).then(data => {
        if(data.length == 0){
            return ctx.body = {code:400,message:"没找到"}
        }
        data.liked++
        data.save()
        return User.findById({_id:ctx.state._id})
    }).then(data=>{
        data.likegworks.push(_id)
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:data.likegworks}
    })
}
exports.gRemoveLikes = async(ctx,next) => {
    let {_id} = ctx.request.body
    await Gworks.findById({_id}).then(data => {
        if(data.length == 0){
            return ctx.body = {code:400,message:"没找到"}
        }
        data.liked--
        data.save()
        return User.findById({_id:ctx.state._id})
    }).then(data=>{ 
        let index = data.likegworks.findIndex(data=>data.equals(_id))
        console.log(index)
        if(index != -1){
            data.likegworks.splice(index,1)
        }
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:data.likegworks}
    })
}




exports.getUDgworksList = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Gworks.find({author:_id,examine:0}).sort({_id:-1}).populate(["author","category"]).then((data)=>{
        return ctx.body = {code:0,message:data};
    })
}

// 查询自己的
exports.getUserGworks = async(ctx,next)=>{
    let _id = ctx.state._id
    await Gworks.find({author:_id}).then(data=>{
        return ctx.body = data
    })
}

// 举报作品
exports.report = async(ctx,next)=>{
    let { _id,comment } = ctx.request.body
    let id = ctx.state._id
    await Gworks.findById({_id}).then(data=>{
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

exports.updataGworks = async(ctx,next) => {
    let { _id, title, description, category } = ctx.request.body
    await Gworks.findById({ _id }).then(data=>{
        data.title = title
        data.description = description
        data.category = category
        data.examine = 1
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:"修改成功"}
    })
}
exports.delete = async(ctx,next) => {
    let { _id } = ctx.request.body
    await Gworks.deleteOne({_id}).then(data=>{
        return ctx.body = {code:0,message:"删除成功"}
    })
}
exports.searchGworks = async (ctx,next) => {
    let { title,category } = ctx.request.body
    if(!title && !category){
        await Gworks.find({ examine:0}).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
    })
    }else if(!!title && !category){
        let r = new RegExp( title ,"gim")
        await Gworks.find({ title:r,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }else if(!title && !!category){
        await Gworks.find({ category,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }else if(!!title && !!category){
        let r = new RegExp( title ,"gim")
        await Gworks.find({ title:r,category,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }
}




// 审核作品集列表
exports.EGworksList = async(ctx,next)=>{
    await Gworks.find({examine:1}).populate(["author","category"]).then(data=>{
        return ctx.body = data
    })
}
// 审核作品集
exports.getEGworks = async(ctx,next)=>{
    console.log(1)
    let { _id } = ctx.request.body
    console.log(_id)
    await Gworks.findById({_id}).populate(["author","category"]).then(data=>{
        return ctx.body = data
    })
}
// 设置审核作品集同意
exports.setGwAdopt = async(ctx,next)=>{
    let { _id } = ctx.request.body
    console.log(_id)
    await Gworks.update({_id:_id},{examine:0},(err,data)=>{
        console.log("修改成功")
        console.log(data)
        return ctx.body = {code:0,message:"成功"}
    })
}
// 设置审核作品集不通过
exports.setGwFail = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Gworks.update({_id:_id},{examine:2},(err,data)=>{
        console.log("修改成功")
        console.log(data)
        return ctx.body = {code:0,message:"成功"}
    })
}



exports.getGworksList = async(ctx,next)=>{
    await Gworks.find().sort({_id:-1}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.getGworksA = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Gworks.findById({_id}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.deleGworks = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Gworks.deleteOne({ _id }).then(data => {
        if(data.ok === 1){
            return ctx.body = { code:0,message:"删除成功"}
        }
        return ctx.body = { code:400,message:"删除失败" }
    }).catch(err=>{
        console.log(err)
        ctx.body = {message:"服务器出错"}
    })
}




exports.getRGworksList = async (ctx,next) => {
    await Gworks.find({report:1}).populate(["author","category","reporttext.user"]).then(data=>{
        return ctx.body = { code:0,message:data }
    })
}
exports.getRGworks = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Gworks.findById({ _id }).populate(["author","category"]).then(data=>{
        return ctx.body = { code:0,message:data }
    })
}
exports.RGworksAdopt = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Gworks.updateOne({ _id },{ report:0,reporttext:[] }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"举报审核成功" }
        }
    })
}
exports.RGworksFail = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Gworks.updateOne({ _id },{ report:2 }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"举报审核成功" }
        }
    })
}