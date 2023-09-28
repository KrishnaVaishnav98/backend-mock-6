const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");

const userRouter = express.Router()

userRouter.use(express.json())

// Signup
userRouter.post("/register", (req, res) => {

    let { name, avatar, email, password } = req.body;

    bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
            let user = await new UserModel({ name, avatar, email, password: hash })
            await user.save()
            res.send({ "msg": "Registration Successfull" })
        } else {
            res.send({ "msg": err })
        }
    });
})


// Login
userRouter.post("/login", async (req, res) => {

    let { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    jwt.sign({ userId: user._id }, 'krishna', function (err, token) {
                        if (token) {
                            res.send({ "msg": "Login Successfull", "token": token })
                        } else {
                            res.send({ "msg": err })
                        }
                    });
                }
            });
        } else {
            res.send("User doesn't exist")
        }

    } catch (err) {
        res.send({ "msg": err })
    }

})


module.exports = {
    userRouter
}