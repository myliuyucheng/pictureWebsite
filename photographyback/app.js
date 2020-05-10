const Koa = require("koa")
// 解析post模块
const koaBody = require('koa-body');
// 请求日志模块
const logger = require('koa-logger');
// 静态文件
const static = require('koa-static');
const { join } = require('path')

const router = require("./routers/router.js")
const origin = require("./utils/origin")
const JwtUtil = require("./utils/jwt")

const app = new Koa

app.use(static(join(__dirname,"public")))

// 注册日志模块
app.use(logger())
// 配置 post模块
app.use(koaBody({
    // 想要传multipart/form-data必须写
    multipart: true,  // 允许上传多个文件
}))
// 解决跨域
app.use(origin)
// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())

app.listen(8085,()=>{
    console.log("正在监听8085端口")
})