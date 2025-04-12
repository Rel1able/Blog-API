require("dotenv").config();
const db = require("../services/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, hashedPassword);
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}


async function createToken(req, res) {
    const token = jwt.sign({id: req.user.id, username: req.user.name}, JWT_SECRET)
    res.status(200).json({token, user: req.user});
}
    
module.exports = {
    createUser,
    createToken,

}