const db = require("../services/queries");
const bcrypt = require("bcryptjs");

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, hashedPassword);
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createUser
}