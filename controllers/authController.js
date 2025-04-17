require("dotenv").config();
const { body, validationResult } = require("express-validator");
const db = require("../services/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateSignUp = [
    body("username")
        .trim()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .custom((async (username) => {
            const user = await db.getUserByUsername(username)
            if (user) {
                throw new Error("Username is already taken")
            }
        })),
    body("password")
        .trim()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("confPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords doesn't match")
            }
            return true
        })
]

async function createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, hashedPassword);
        res.json({message: "User was created"})
    } catch (err) {
        return next(err);
    }
}


async function createToken(req, res) {
    try {
        const { id, username, role } = req.user;
        const token = jwt.sign({id: id, username: username, role: role}, JWT_SECRET)
        res.status(200).json({token, user: {id, username, role}});
    } catch (err) {
        console.log(err);
    }
   
}

    
module.exports = {
    createUser,
    createToken,
    validateSignUp
}