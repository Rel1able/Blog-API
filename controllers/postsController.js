const db = require("../services/queries");

async function getPosts(req, res) {
    const posts = await db.getPosts();
    return res.json(posts);
}

async function createPost(req, res) {
    console.log("BODY", req.body)
    await db.createPost(req.body.title,req.body.text, parseInt(req.body.userId));
    res.json("Post was created");
}

async function getPostById(req, res) {
    const postId = req.params.id;
    const post = await db.getPostById(postId);
    res.json(post);
}

async function editPost(req, res) {
    const postId = req.params.id;
    await db.editPost(postId, req.body.title, req.body.text);
    res.json("Post was updated");
}

async function deletePost(req, res) {
    const postId = req.params.id;
    await db.deletePost(postId);
    res.json("Post was deleted");

}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    deletePost,
    editPost
}