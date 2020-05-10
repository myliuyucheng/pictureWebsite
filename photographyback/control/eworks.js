const { db } = require("../models/config")
const EWorksSchema = require("../models/Schema/eworks")
const EWorks = db.model("eworks",WorksSchema)

exports.EWorksList = async(ctx,next){
    
}