const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    name: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    userId: String,
    comments: [
        {
            name: String,
            content: String,
            userId: String
        }
    ]
})

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = { BlogModel }