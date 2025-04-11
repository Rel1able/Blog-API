const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            name: username
        }
    })
    return user
}

async function createUser(username, password) {
    await prisma.user.create({
        data: {
            name: username,
            password: password
        }
    })
}

async function getPosts() {
    const posts = await prisma.post.findMany();
    return posts;
}

async function createPost(title,text, userId) {
    await prisma.post.create({
        data: {
            title: title, 
            text: text,
            userId: userId

        }
    })
}

async function getPostById(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: +postId
        }
    })
    return post
}

async function createComment(text, postId, userId) {
    await prisma.comment.create({
        data: {
            text: text,
            postId: postId,
            userId: userId
        }
    })
}

async function getComments(postId) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: +postId
        }
    })
    return comments
}

async function deleteComment(commentId) {
    await prisma.comment.delete({
        where: {
            id: +commentId
        }
    })
}

async function editPost(postId, title, text) {
    await prisma.post.update({
        where: {
            id: +postId
        },
        data: {
            title: title,
            text: text
        }
    })
}

async function deletePost(postId) {
    await prisma.comment.deleteMany({
        where: {
            postId: +postId
        }
    })
    await prisma.post.delete({
        where: {
            id: +postId
        }
    })
}


module.exports = {
    getUserByUsername,
    createUser,
    getPosts,
    createPost,
    getPostById,
    createComment,
    getComments,
    deleteComment,
    editPost,
    deletePost
}
