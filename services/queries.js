const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function test() {
    const test= await prisma.user.findMany();
    console.log(test);
}

test();
