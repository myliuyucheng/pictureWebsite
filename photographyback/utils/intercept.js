const JwtUtil = require("../utils/jwt")

const url = [
    // "/works/getcategory",
    // "/works/setcomment",
    // "/works/likes",
    // "/user/getlikes",
    // "/article/setcomment",
    // "/works/addworks",
    // "/addArticle",
    // "/addgworks",
    // "/gworks/setcomment",
    // "/gworks/setlikes",
    // "/user/getgwlikes",
    // ""
    "/login",
    "/register",
    "/admin/login",
    ]

module.exports = async (ctx,next)=>{
    if (!url.some(data=>data==ctx.url)) {
        console.log("正在验证中...")
        let token = ctx.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log("登录已过期")
            ctx.body = {code: 403, message: '登录已过期,请重新登录'};
        } else {
            ctx.state._id = result
            console.log("验证成功")
            await next();
        }
    } else {
        await next();
    }
    // await next();
}