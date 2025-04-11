const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require("../controllers/commentsController");

commentsRouter.get("/:postId/comments", commentsController.getComments);
commentsRouter.post("/:postId/comments", commentsController.createComment)

module.exports = commentsRouter;