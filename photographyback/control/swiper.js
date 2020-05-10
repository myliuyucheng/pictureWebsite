const { db } = require("../models/config")
const SwiperSchema = require("../models/Schema/swiper")

const Swiper = db.model("swipers",SwiperSchema)

exports.SwiperList = async (ctx,next) => {
    await Swiper.find().then((data)=>{
        console.log(data)
        return ctx.body = data
    })
}