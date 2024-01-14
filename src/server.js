import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.friendRequest.deleteMany({});
  const user2 = await prisma.user.deleteMany({});

  console.log(user, user2);
}

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
