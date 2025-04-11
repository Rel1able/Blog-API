const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require("../controllers/commentsController");

commentsRouter.get("/:postId/comments", commentsController.getComments);
commentsRouter.post("/:postId/comments", commentsController.createComment)

commentsRouter.delete("/:postId/comments/:commentId", commentsController.deleteComment)

module.exports = commentsRouter;