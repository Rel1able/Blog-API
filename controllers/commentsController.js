const db = require("../services/queries");

async function getComments(req, res) {
    console.log("PArams", req.params.postId)
    const comments = await db.getComments(req.params.postId);
    return res.json(comments);
}

async function createComment(req, res) {
    const text = req.body.text;
    const postId = parseInt(req.params.postId);
    console.log("YOUR BODY", req.body, req.params.postId);
    const userId = req.body.userId
    await db.createComment(text, postId, userId)
    return res.json("Success");
    
}

async function deleteComment(req, res) {
    const commentId = req.params.commentId;
    await db.deleteComment(commentId);
    res.json("Comment was deleted")
}


module.exports = {
    getComments,
    createComment,
    deleteComment
}