require("dotenv").config();
const db = require("../services/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, hashedPassword);
        res.json({message: "User was created"})
    } catch (err) {
        return next(err);
    }
}


async function createToken(req, res) {
    const token = jwt.sign({id: req.user.id, username: req.user.username}, JWT_SECRET)
    res.status(200).json({token});
}
    
module.exports = {
    createUser,
    createToken,

}