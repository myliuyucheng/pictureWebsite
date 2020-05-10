const { db } = require("../models/config")
const UserSchema = require("../models/Schema/user")
const JwtUtil = require("../utils/jwt")

const fs = require('fs');
const path = require('path');

const User = db.model("users",UserSchema)

exports.userList = async (ctx,next) => {
    let _id = ctx.state._id 
    await User.find({_id:{$ne:[_id]}}).then((data)=>{
        ctx.body = data;
    })
}


// 用户登录
exports.login = async(ctx,next)=>{
    // 返回参数列表
    const errno = [
        {code:0,message:"登录成功"},
        {code:1,message:"用户名或密码错误"},
        {code:4,message:"服务器错误"},
    ]
    // 取出post数据
    const user = ctx.request.body
    const { username,password } = user
    // 查找用户名
    await User.find({username}).then((data) => {
        // 没有找到该用户名
        if(data.length === 0) return ctx.body = errno[1]
        // 比较密码
        if(data[0].password === password){
            // 登陆成功，添加token验证
            let _id = data[0]._id.toString();
            // 将用户id传入并生成token
            let jwt = new JwtUtil(_id);
            let token = jwt.generateToken();
            // 将 token 返回给客户端
            errno[0].token = token
            errno[0].name = data[0].name
            console.log(errno[0])
            return ctx.body = errno[0]
        }
        // 密码错误
        ctx.body = errno[1]
    }).catch(err => {
        console.log(err)
        ctx.body = errno[2]
    })
}


// 用户注册
exports.register = async(ctx, next)=>{
    // 返回参数列表
    const errno = [
        {code:0,message:"注册成功"},
        {code:1,message:"账号为空"},
        {code:2,message:"密码为空"},
        {code:3,message:"用户已存在"},
        {code:4,message:"服务器错误"},
    ]
    // 用户注册是 post 发过来的数据
    const user = ctx.request.body
    const file = ctx.request.files.file;
    const { name,username,password } = user
    console.log(user)
    const extname = path.extname(file.name);
    //　本地文件服务器获取POST上传文件过程
    // １. fs.createReadStream 创建可读流
    // ２. fs.createWriteStream　创建可写流
    // 3. reader.pipe(writer)
    let url = `public/image/${Math.random().toString(36).substr(2)}${extname}`
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(
        // `${url}${extname}`
        url
    );
    reader.pipe(writer);
    console.log("照片保存完成")
    // 账号密码是否为空
    if(username.length === 0) return ctx.body = errno[1]
    if(password.length === 0) return ctx.body = errno[2]
    await User.find({username}).then(data=>{
        // 用户存在
        if(data.length !== 0) return ctx.body = errno[3]
        // 创建用户
        const _user = new User({
            name,
            username,
            password,
            url,
        })
        console.log(_user)
        _user.save((err,data) => {
            // 保存失败
            if(err){
                return ctx.body = errno[4]
            }
        })
        // 成功
        console.log(url)
        return ctx.body = errno[0] 
    }).catch(err => {
        ctx.body = errno[4]
    })

}

// 获取喜欢列表
exports.getLikes = async(ctx,next)=>{
    await User.findById({_id:ctx.state._id}).select(['likeworks',"likegworks","likearticle"]).then(data=>{
        return ctx.body = data
    })
}
// 获取自己的信息
exports.getUser = async(ctx,next)=>{
    await User.findById({_id:ctx.state._id}).then(data=>{
        ctx.body = data
    })
}
exports.getDetails = async(ctx,next)=>{
    let { _id } = ctx.request.body
    await User.findById({_id}).then(data=>{
        data.views++
        return data.save()
    }).then(data=>{
        return ctx.body = data
    })
}

// 设置背景
exports.setback = async(ctx,next)=>{
    const file = ctx.request.files.file;
    const _id = ctx.state._id
    const extname = path.extname(file.name);
    let url = `public/image/${Math.random().toString(36).substr(2)}${extname}`
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(
        url
    );
    reader.pipe(writer);
    url = url.substr(7)
    console.log(url)
    console.log("照片保存完成")
    await User.findById({_id}).then(data=>{
        data.profileurl = url
        return data.save()
    }).then(data=>{
        return ctx.body = data
    })
}

// 关注粉丝
exports.getSelfFollow = async (ctx,next)=>{
    const _id = ctx.state._id
    return await User.findById({ _id }).then(data=>{
        console.log(data.follow.length)
        if(data.follow.length === 0){
            return ctx.body = {code:0,message:[]}
        }
        return User.findById({ _id }).populate("follow.user",{"name":1,"url":1,"_id":1})
    }).then(data=>{
        console.log(data.follow)
        return ctx.body = {code:0,message:data.follow}
    })
}
exports.getSelfFans = async (ctx,next)=>{
    const _id = ctx.state._id
    return await User.findById({ _id }).then(data=>{
        if(data.fans.length === 0){
            return ctx.body = {code:0,message:[]}
        }
        return User.findById({ _id }).populate("fans.user",{"name":1,"url":1,"_id":1})
    }).then(data=>{
        return ctx.body = {code:0,message:data.fans}
    })
}
exports.getFollow = async (ctx,next)=>{
    const { _id } = ctx.request.body
    return await User.findById({ _id }).then(data=>{
        if(data.follow.length === 0){
            return ctx.body = {code:0,message:[]}
        }
        return User.findById({ _id }).populate("follow.user",{"name":1,"url":1,"_id":1})
    }).then(data=>{
        return ctx.body = {code:0,message:data.follow}
    })
}
exports.getFans = async (ctx,next)=>{
    const { _id } = ctx.request.body
    return await User.findById({ _id }).then(data=>{
        if(data.fans.length === 0){
            return ctx.body = {code:0,message:[]}
        }
        return User.findById({ _id }).populate("fans.user",{"name":1,"url":1,"_id":1})
    }).then(data=>{
        return ctx.body = {code:0,message:data.fans}
    })
}
exports.setFollow = async (ctx,next)=>{
    const id = ctx.request.body._id
    console.log(id)
    const _id = ctx.state._id
    await User.findOne({ _id }).then(data=>{
        let index = data.follow.findIndex(data=> data.user.toString() === id)
        console.log(index)
        if(index === -1){
            data.follow.push({'user':id})
            return data.save()
        }
        return ctx.body = {code:0,message:"没找到你的关注"}
    }).then(data=>{
        return User.findById({ _id:id })
    }).then(data=>{
        data.fans.push({
            'user': _id,
        })
        return data.save()
        return ctx.body = {code:0,message:"没找到他的粉丝"}
    }).then(data=>{
        return ctx.body = {code:0,message:"成功"}
    })
}
exports.removeFollow = async (ctx,next)=>{
    const id = ctx.request.body._id
    console.log(id)
    const _id = ctx.state._id
    await User.findOne({ _id }).then(data=>{
        let index = data.follow.findIndex(data=> data.user.toString() === id)
        console.log(index)
        if(index !== -1){
            data.follow.splice(index,1)
            return data.save()
        }
        return ctx.body = {code:0,message:"没找到你的关注"}
    }).then(data=>{
        return User.findById({ _id:id })
    }).then(data=>{
        let index = data.fans.findIndex(data=> data.user.toString() === _id)
        if(index !== -1){
            data.fans.splice(index,1)
            return data.save()
        }
        return ctx.body = {code:0,message:"没找到他的粉丝"}
    }).then(data=>{
        return ctx.body = {code:0,message:"成功"}
    })
}
// exports.setFollow = async (ctx,next)=>{
//     const id = ctx.request.body._id
//     console.log(id)
//     const _id = ctx.state._id
//     await User.findOne({ _id }).then(data=>{
//         let index = data.follow.findIndex(data=> data.user.toString() === id)
//         console.log(index)
//         if(index !== -1){
//             console.log(data)
//             data.follow.splice(index,1)
//             return User.findById({ _id:id }).then(data=>{
//                 let index = data.fans.findIndex(data=> data.user.toString() === _id)
//                 if(index !== -1){
//                     data.fans.splice(index,1)
//                 }
//             })
//             // return data.save()
//         }else{
//             data.follow.push({'user':id})
//             return User.findById({ _id:id }).then(data=>{
//                 data.fans.push({
//                     'user': _id,
//                 })
//             })
//         }
//     }).then(data=>{
//         return data.save()
//         return ctx.body = {code:0,message:"成功"}
//     })
// }





// 审核用户登录
exports.ELogin = async(ctx,next)=>{
    let { username,password } = ctx.request.body
    await User.findOne({username}).then(data=>{
        if(!data){
            console.log("没找到")
            return ctx.body = { code:400,message:"没有此用户" }
        }   
        if(data.password == password){
            if(data.isAdmin == 2||data.isAdmin == 1){
                let _id = data._id.toString();
                // 将用户id传入并生成token
                let jwt = new JwtUtil(_id);
                let token = jwt.generateToken();
                // 将 token 返回给客户端
                return ctx.body = {code:0,message:"成功",token,name:data.name,isAdmin:data.isAdmin}
            }else{
                return ctx.body = {code:400,message:"您不是管理员"}
            }
        }
        return ctx.body= {code:0,message:"密码不正确"}
    })
}




exports.getUserList = async (ctx,next) => {
    await User.find().sort({_id:-1}).then((data)=>{
        return ctx.body = {code:0,message:data};
    })
}
exports.deleUser = async (ctx,next) => {
    let { _id } = ctx.request.body
    await User.deleteOne({ _id }).then(data=>{
        if(data.ok === 1){
            return ctx.body = { code:0,message:"删除成功" }
        }
        return ctx.body = { code:400,message:"删除失败" }
    }).catch(err => {
        console.log(err)
        return ctx.body = {message:"服务器出错"}
    })
}