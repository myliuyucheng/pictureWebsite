const { db } = require("../models/config")
const TipsCategorySchema = require("../models/Schema/tCategory")

const TipsCategory = db.model("tcategorys",TipsCategorySchema)

exports.TipsCategoryList = async (ctx,next) => {
    await TipsCategory.find().then((data)=>{
        console.log(data)
        ctx.body = data;
    })
}