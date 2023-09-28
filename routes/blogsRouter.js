const express = require("express")
const { auth } = require("../middleware/auth")
const { BlogModel } = require("../model/blogModel")
const { UserModel } = require("../model/userModel")

const blogsRouter = express.Router()

blogsRouter.use(express.json())

// get all blogs
// blogsRouter.get("/", auth, async (req, res) => {

//     let { title, sort, order, category } = req.query

//     let param = {
//         title: "",
//         sort: "date",
//         order: ""

//     }
//     if (title) {
//         param.title = title
//     }
//     if (sort && order) {
//         param.sort = sort
//         if (order == "desc") {
//             param.order = -1
//         } else {
//             param.order = 1
//         }
//     }
//     if (category) {
//         param.category = category
//     }

//     let blogs = await BlogModel.find({ title: param.title, category: param.category }).sort({ date: param.order })
//     res.send({ "blog": blogs })
// })

blogsRouter.get("/", auth, async (req, res) => {

    let blog = await BlogModel.find({})
    res.send({ "msg": blog })

})

// post blog
blogsRouter.post("/", auth, async (req, res) => {
    let { name, title, category, content, userId } = req.body;
    let newBlog = await new BlogModel({ name, title, category, content, userId, date: new Date(), likes: 0, comments: [] })
    await newBlog.save()
    res.send({ "msg": "Blog posted Successfully" })
})

// find blog with title
blogsRouter.get("/", auth, async (req, res) => {
    let { title } = req.query

    let blog = await BlogModel.find({ title: title })

    res.send({ "msg": blog })
})

// find blog with category
blogsRouter.get("/", auth, async (req, res) => {
    let { category } = req.query
    let blog = await BlogModel.find({ category: category })
    res.send({ "msg": blog })
})

// find blog sort
blogsRouter.get("/", auth, async (req, res) => {
    let { sort, order } = req.query
    if (order == "desc") {
        let blog = await BlogModel.find({}).sort({ date: -1 })
        res.send({ "msg": blog })
    } else {
        let blog = await BlogModel.find({}).sort({ date: 1 })
        res.send({ "msg": blog })
    }
})

// update blog
blogsRouter.patch("/:id", auth, async (req, res) => {
    let { id } = req.params

    let blog = await BlogModel.findByIdAndUpdate(id, req.body)
    res.send({ "msg": "Blog Updated Successfully" })
})

// update blog
blogsRouter.delete("/:id", auth, async (req, res) => {
    let { id } = req.params

    let blog = await BlogModel.findByIdAndDelete(id)
    res.send({ "msg": "Blog Updated Successfully" })
})


// add like to blog
blogsRouter.patch("/:id/like", auth, async (req, res) => {
    let { id } = req.params

    let old = await BlogModel.find({ "_id": id })
    let likes = old.likes
    let blog = await BlogModel.findByIdAndUpdate(id, { "like": Number(likes) + 1 })
    res.send({ "msg": "Liked Successfully" })
})

// Add comment
blogsRouter.patch("/:id/comment", auth, async (req, res) => {
    let { id } = req.params
    let user = await UserModel.find({ _id: req.body.userId })
    let old = await BlogModel.find({ "_id": id })
    let comments = old.comments.push({ name: user.name, userId: user._id, content: req.body.content })
    let blog = await BlogModel.findByIdAndUpdate(id, { "comments": comments })
    res.send({ "msg": "Comment Posted" })
})

module.exports = {
    blogsRouter
}