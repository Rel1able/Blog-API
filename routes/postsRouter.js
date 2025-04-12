const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const isAdmin = require("../middlewares/isAdmin");

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/",isAdmin, postsController.createPost);

postsRouter.get("/:id", postsController.getPostById)

postsRouter.put("/:id",isAdmin, postsController.editPost)
postsRouter.delete("/:id",isAdmin, postsController.deletePost)

module.exports = postsRouter;