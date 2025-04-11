const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.createPost);
postsRouter.get("/:id", postsController.getPostById)

module.exports = postsRouter;