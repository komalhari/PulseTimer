import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createProfile(userId, userName){

try{
const profile = await prisma.profile.create({
data:{
    userId : userId,
    username : userName,
}
})
return profile;
}
catch(e){
    console.log(e)
}

}