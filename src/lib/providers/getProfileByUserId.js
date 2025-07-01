import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getProfileByUserID(userId){

return await prisma.profile.findUnique({where : {userId}})

}