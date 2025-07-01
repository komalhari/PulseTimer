import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAuthByUserID(userId){

return await prisma.auth.users.findUnique({where : {userId}})

}