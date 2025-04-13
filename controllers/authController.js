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
    const user = {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
    }
    const token = jwt.sign({id: user.id, username: user.username, role: user.role}, JWT_SECRET)
    res.status(200).json({token, user});
}

async function handleLogout(req, res, next) {
    req.logout((err) => {
        return next(err);
    })
    res.json({msg: "You was successfully logged out"})
}

    
module.exports = {
    createUser,
    createToken,
    handleLogout

}