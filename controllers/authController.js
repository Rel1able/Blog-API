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
    const { id, username, role } = req.user;
    const token = jwt.sign({id: id, username: username, role: role}, JWT_SECRET)
    res.status(200).json({token, user: {id, username, role}});
}

    
module.exports = {
    createUser,
    createToken,

}