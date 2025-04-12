const { Router } = require("express");
const authController = require("../controllers/authController");
const authRouter = Router();
const passport = require("passport");
const isAdmin = require("../middlewares/isAdmin");


authRouter.post("/sign-up", authController.createUser);
authRouter.post("/login", passport.authenticate("local", { session: false }), authController.createToken);


module.exports = authRouter;