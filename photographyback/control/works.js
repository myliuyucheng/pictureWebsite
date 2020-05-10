const { db } = require("../models/config")
const WorksSchema = require("../models/Schema/works")
const Works = db.model("works",WorksSchema)

const UserSchema = require("../models/Schema/user")
const User = db.model("users",UserSchema)

const fs = require('fs');
const path = require('path');

// 添加作品
exports.addWorks = async (ctx, next)=>{
    console.log("正在上传作品...")
    console.log("正在保存照片...")
    // 获取文字信息
    const { title,description,category } = ctx.request.body
    // 获取文件
    const file = ctx.request.files.file;
    // 取出扩展名
    const extname = path.extname(file.name);
    //　本地文件服务器获取POST上传文件过程
    // １. fs.createReadStream 创建可读流
    // ２. fs.createWriteStream　创建可写流
    // 3. reader.pipe(writer)
    //
    let url = `public/image/${Math.random().toString(36).substr(2)}${extname}`
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(
        // `${url}${extname}`
        url
    );
    reader.pipe(writer);
    console.log("照片保存完成")
    // 计算路径
    url = url.substr(7)
    // 保存信息
    console.log("正在上传数据库...")
    const _Works = new Works({
        title,
        description,
        category,
        url,
        author: ctx.state._id,
    })
    _Works.save((err,data)=>{
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
// 作品列表
exports.worksList = async (ctx, next)=>{
    await Works.find({examine:0}).sort({_id:-1}).populate(["author","category"]).then((data)=>{
        ctx.body = { code:0,message:data};
    })
}

// 点击喜欢按钮
exports.worksLikes = async(ctx,next)=>{
    console.log("正在访问喜欢路由...")
    let {_id} = ctx.request.body
    console.log("正在查找作品中...")
    await Works.findById({_id}).then(data => {
        if(data.length == 0){
            console.log("没找到此作品")
            return ctx.body = {code:400,message:"没找到"}
        }
        data.liked++
        data.save()
        console.log("保存成功，喜欢加一")
        return User.findById({_id:ctx.state._id})
    }).then(data=>{
        data.likeworks.push(_id)
        return data.save()
    }).then(data=>{
        console.log("喜欢添加成功")
        console.log("用户添加成功")
        console.log(data)
        return ctx.body = {code:0,message:data.likeworks}
        
    })
}
// 移出作品喜欢
exports.wRemoveLikes = async(ctx,next)=>{
    let {_id} = ctx.request.body
    await Works.findById({_id}).then(data => {
        if(data.length == 0){
            return ctx.body = {code:400,message:"没找到"}
        }
        data.liked--
        data.save()
        return User.findById({_id:ctx.state._id})
    }).then(data=>{
        console.log(data.likeworks)
        console.log(_id)    
        let index = data.likeworks.findIndex(data=>data.equals(_id))
        console.log(index)
        if(index != -1){
            data.likeworks.splice(index,1)
        }
        return data.save()
    }).then(data=>{
        return ctx.body = {code:0,message:data.likeworks}
    })
}

// 获取作品信息
exports.getWorks = async(ctx,next)=>{
    console.log("正在访问查询作品路由...")
    let { _id } = ctx.request.body
    console.log(_id)
    console.log("正在查找作品中...")
    await Works.findById({_id}).populate(["author","category"]).populate(["comment.author"]).then(data =>{
        if(data.length == 0){
            console.log("没找到此作品")
            return ctx.body = {code:400,message:"没找到"}
        }
        data.views++
        return data.save()
    }).then(data=>{
        data.comment.reverse()
        console.log(data)
        console.log("查找成功")
        ctx.body = { code:0,message:data }
        
    })
}

// 写评论
exports.setComment = async(ctx,next)=>{
    let { comment,_id } = ctx.request.body
    // ctx.state._id
    console.log("正在访问评论发布路由...")
    const com = {
        comment,
        author: ctx.state._id,
        time:new Date,
    }
    console.log("正在查询文章...")
    await Works.findById({_id}).populate(["author","category"]).populate(["comment.author"]).then(data=>{
        data.comment.push(com)
        return data.save()
    }).then(data=>{
        return Works.findById({_id}).populate(["author","category"]).populate(["comment.author"])
    }).then(data=>{
        data.comment.reverse()
        console.log(data)
        return ctx.body = data
    })
}

// 获取评论列表
exports.getComment = async(ctx,next)=>{
    console.log(1)
    console.log(ctx.request.body)
    let { _id } = ctx.request.body
    let dataArr = []
    Works.findById({_id}).then(data=>{
        dataArr = data.slice()
        for(let a=0;a<data.length;a++){
            console.log(data)
            User.findById({_id:data.author}).then(data=>{
                dataArr[a].name = data.name
                dataArr[a].userurl = data.url
            })
        }
    })  
    return ctx.body = dataArr
}
// 举报作品
exports.report = async(ctx,next)=>{
    let { _id,comment } = ctx.request.body
    let id = ctx.state._id
    await Works.findById({_id}).then(data=>{
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
// 用户作品
exports.getUserWorks = async(ctx,next)=>{
    let _id = ctx.state._id
    await Works.find({author:_id}).sort({_id:-1}).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.getUDworksList = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Works.find({author:_id,examine:0}).sort({_id:-1}).populate(["author","category"]).then((data)=>{
        ctx.body = {code:0,message:data};
    })
}


exports.updataWorks = async(ctx,next) => {
    let { _id, title, description, category } = ctx.request.body
    await Works.findById({ _id }).then(data=>{
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
    await Works.deleteOne({_id}).then(data=>{
        console.log(data)

        return ctx.body = {code:0,message:"删除成功"}
    })
}
exports.searchWorks = async (ctx,next) => {
    let { title,category } = ctx.request.body
    console.log(!title)
    console.log(!!category)
    if(!title && !category){
        await Works.find({ examine:0}).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
    })
    }else if(!!title && !category){
        let r = new RegExp( title ,"gim")
        await Works.find({ title:r,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            console.log(data)
            return ctx.body = {code:0,message:data}
        })
    }else if(!title && !!category){
        await Works.find({ category,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            return ctx.body = {code:0,message:data}
        })
    }else if(!!title && !!category){
        let r = new RegExp( title ,"gim")
        await Works.find({ title:r,category,examine:0 }).sort({_id:-1}).populate(["author","category"]).then(data=>{
            console.log(data)

            return ctx.body = {code:0,message:data}
        })
    }
}


exports.EWorksList = async(ctx,next)=>{
    await Works.find({examine:1}).populate(["author","category"]).then(data=>{
        return ctx.body = data
    })
}
exports.getEWorks = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Works.findById({_id}).populate(["author","category"]).then(data=>{
        return ctx.body = data
    })
}
// 设置审核作品同意
exports.setWAdopt = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Works.update({_id:_id},{examine:0},(err,data)=>{
        console.log("修改成功")
        console.log(data)
        return ctx.body = {code:0,message:"成功"}
    })
}
// 设置审核作品不通过
exports.setWFail = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Works.update({_id:_id},{examine:2},(err,data)=>{
        console.log("修改成功")
        console.log(data)
        return ctx.body = {code:0,message:"成功"}
    })
}


// 作品列表
exports.getWorksList = async(ctx,next)=>{
    await Works.find().sort({_id:-1}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.getWorksA = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await Works.findById({_id}).populate(["author","category"]).then(data=>{
        return ctx.body = {code:0,message:data}
    })
}
exports.deleWorks = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Works.deleteOne({ _id }).then(data => {
        if(data.ok === 1){
            return ctx.body = { code:0,message:"删除成功"}
        }
        return ctx.body = { code:400,message:"删除失败" }
    }).catch(err=>{
        console.log(err)
        ctx.body = {message:"服务器出错"}
    })
}



exports.getRWorksList = async (ctx,next) => {
    await Works.find({report:1}).populate(["author","category","reporttext.user"]).then(data=>{
        return ctx.body = { code:0,message:data }
    })
}
exports.getRWorks = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Works.findById({ _id }).populate(["author","category"]).then(data=>{
        return ctx.body = { code:0,message:data }
    })
}
exports.RWorksAdopt = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Works.updateOne({ _id },{ report:0,reporttext:[] }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"举报审核成功" }
        }
    })
}
exports.RWorksFail = async (ctx,next) => {
    let { _id } = ctx.request.body
    await Works.updateOne({ _id },{ report:2 }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"举报审核成功" }
        }
    })
}