"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function changeUsername({userId, NewUserName}) {
    console.log(userId, NewUserName)
  try {
    const profile = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        username: NewUserName,
      },
    });
    return profile;
  } catch  {
    console.log(e);
  }
}
