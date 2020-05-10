const { Schema } = require("../config.js")

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    isAdmin:{
        type: Number,
        default: 0,
    },
    url: String,
    likeworks:[{
        _id:{type: Schema.Types.ObjectId,
        ref: "works",}
    }],
    likearticle:[{
        _id:{type: Schema.Types.ObjectId,
        ref: "articles",}
    }],
    likegworks:[{
        _id:{type: Schema.Types.ObjectId,
        ref: "gworks",}
    }],
    profileurl:String,
    views: {
        type: Number,
        default: 0,
    },
    follow: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    }],
    fans: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    }]
},{versionKey:false})

module.exports = UserSchema