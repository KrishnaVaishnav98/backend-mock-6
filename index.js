const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRouter");
const { blogsRouter } = require("./routes/blogsRouter");


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", userRouter)
app.use("/api/blogs", blogsRouter)

app.get("/", (req, res) => {
    res.send("|| Welcome to Blogs App ||")
})

app.listen(8080, async () => {
    try {
        await connection
        console.log("CONNECTED TO DB ON PORT 8080")
    } catch (err) {
        console.log(err)
    }
})