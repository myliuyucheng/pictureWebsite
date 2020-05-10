module.exports = async (ctx, next) => {
    console.log("正在跨域中")
    ctx.set("Access-Control-Allow-Origin","*")
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, token');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set("Access-Control-Allow-Credentials", "true");
    // console.log(ctx.method)
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
    await next();
    }
}