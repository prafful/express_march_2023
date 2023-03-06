let mongoose = require("mongoose")

//use mongoose to initialize schema
let mongoSchema = mongoose.Schema

//use mongoSchema to create reference model to song collection
let songSchema = new mongoSchema({
    "videoid":String,
    "likes": Number,
    "dislikes": Number,
    "views": Number
}, {
    collection:"song"
})

//export the model
module.exports = mongoose.model('song', songSchema)