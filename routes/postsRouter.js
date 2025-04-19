const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const isAdmin = require("../middlewares/isAdmin");
const passport = require("passport");

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/",passport.authenticate("jwt", {session: false}),isAdmin, postsController.createPost);

postsRouter.get("/published", postsController.getPublishedPosts);
postsRouter.get("/unpublished", postsController.getUnpublishedPosts);



postsRouter.get("/:id", postsController.getPostById)

postsRouter.put("/:id",passport.authenticate("jwt", {session: false}), isAdmin, postsController.editPost)
postsRouter.put("/:id/publish", passport.authenticate("jwt", { session: false }), isAdmin, postsController.publishPost)
postsRouter.put("/:id/unpublish", passport.authenticate("jwt", {session: false}),isAdmin, postsController.unpublishPost)

postsRouter.delete("/:id",passport.authenticate("jwt", {session: false}),isAdmin, postsController.deletePost)

module.exports = postsRouter;