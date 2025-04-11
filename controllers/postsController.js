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

module.exports = {
    getPosts,
    createPost,
    getPostById
}