const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    let { authorization } = req.headers;

    var decoded = jwt.verify(authorization, 'krishna');
    if (decoded) {
        req.body.userId = decoded.userId
        next()
    } else {
        res.send({ "msg": "Not authorized" })
    }
}

module.exports = { auth }