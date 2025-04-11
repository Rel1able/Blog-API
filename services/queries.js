const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            name: username
        }
    })
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
            id: parseInt(postId)
        }
    })
    return post
}


module.exports = {
    getUserByUsername,
    createUser,
    getPosts,
    createPost,
    getPostById
}
