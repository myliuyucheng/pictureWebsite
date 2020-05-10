const { db } = require("../models/config")
const TipsArticlesSchema = require("../models/Schema/tArticle")

const TipsArticle = db.model("tarticles",TipsArticlesSchema)

exports.TipsArticleList = async (ctx,next) => {
    await TipsArticle.find().populate(["author","category"]).then((data)=>{
        console.log(data)
        ctx.body = data;
    })
}