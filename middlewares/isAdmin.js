function isAdmin(req, res, next) {
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        res.json("You must be an admin to see this route");
    }
}

module.exports = isAdmin