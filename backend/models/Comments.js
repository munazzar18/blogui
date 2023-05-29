const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentsSchema = new Schema({

    content : {
        type : String
    },

    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blogs'
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

module.exports = mongoose.model('comments', commentsSchema)