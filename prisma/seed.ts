import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

const userList: Prisma.UserCreateInput[] = [
  {
    id: "al814zcy80074hloomogrg1mv",
    name: "Teacher Rick",
    role: "NORMAL",
    email: "zeruela@mrfisch.com",
  },
  {
    id: "bl814zcy80074hloomogrg1mv",
    name: "Mr Fisch",
    role: "PORTULOVER",
    email: "mrfisch@mrfisch.com",
  },
];

const portLinks: Prisma.LinkCreateManyInput[] = [
  { title: "mrcarlos", url: "localhost:777", userId: userList[1].id as string },
  {
    title: "migoooooool",
    url: "localhost:2222",
    userId: userList[1].id as string,
  },
];

const codeList = [
  {
    code_title: "anon code",
    code_block: "print('kkk')",
    language: "python",
    tags: ["tubias", "kkk"],
  },
  {
    userId: userList[1].id as string,
    code_title: "mr fisch code",
    code_block: "print('kkk')",
    language: "rust",
    tags: ["wisa", "migol"],
  },
];

async function main() {
  console.log(`Start seeding ...`);
  console.log(`Creating users`);
  for (const u of userList) {
    await prisma.user.upsert({
      create: u,
      update: {},
      where: { id: u.id },
    });
  }
  console.log(`Creating codes...`);
  await prisma.code.createMany({
    data: codeList,
  });
  console.log(`Creating link for portulovers...`);
  await prisma.link.createMany({ data: portLinks });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
