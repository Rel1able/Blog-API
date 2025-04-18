const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const isAdmin = require("../middlewares/isAdmin");
const passport = require("passport");

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/",passport.authenticate("jwt", {session: false}),isAdmin, postsController.createPost);

postsRouter.get("/:id", postsController.getPostById)

postsRouter.put("/:id",passport.authenticate("jwt", {session: false}), isAdmin, postsController.editPost)
postsRouter.delete("/:id",passport.authenticate("jwt", {session: false}),isAdmin, postsController.deletePost)

module.exports = postsRouter;