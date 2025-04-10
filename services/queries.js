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

module.exports = {
    getUserByUsername,
    createUser
}
