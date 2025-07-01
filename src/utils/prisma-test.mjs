import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Available models:", Object.keys(prisma));

  // Try listing all workouts (should be empty or return some)
  const workouts = await prisma.workouts.findMany();
  console.log("Fetched workouts:", workouts);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
