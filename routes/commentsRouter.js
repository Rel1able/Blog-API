const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require("../controllers/commentsController");
const isAdmin = require("../middlewares/isAdmin");
const passport = require("passport");

commentsRouter.get("/:postId/comments",commentsController.getComments);
commentsRouter.post("/:postId/comments",passport.authenticate("jwt", {session: false}), commentsController.createComment)

commentsRouter.delete("/:postId/comments/:commentId",passport.authenticate("jwt", {session: false}), isAdmin, commentsController.deleteComment)

module.exports = commentsRouter;