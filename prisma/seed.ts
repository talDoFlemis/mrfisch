import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

const userList: Prisma.UserCreateInput[] = [
  {
    id: "al814zcy80074hloomogrg1mv",
    name: "Migol",
    role: "NORMAL",
    email: "zeruela@mrfisch.com",
  },
  {
    id: "bl814zcy80074hloomogrg1mv",
    name: "Mr Fisch",
    role: "PORTULOVER",
    email: "mrfisch@mrfisch.com",
  },
  {
    id: "bl814zcy80074hloomogrg1mc",
    name: "MX30",
    role: "PORTULOVER",
    email: "mx30@mrfisch.com",
  },
];

const portLinks: Prisma.LinkCreateManyInput[] = [
  { title: "mrcarlos", url: "localhost:777", userId: userList[1].id as string },
  {
    title: "migoooooool",
    url: "localhost:2222",
    userId: userList[1].id as string,
  },
  {
    title: "mx30 was here",
    url: "localhost:2222",
    userId: userList[2].id as string,
  },
];

const codeList: Prisma.CodeCreateManyInput[] = [
  {
    code_title: "anon code",
    code_block: "print('kkk')",
    language: "makefile",
    tags: ["tubias", "kkk"],
  },
  {
    userId: userList[1].id as string,
    code_title: "mr fisch code",
    code_block: "print('kkk')",
    language: "rust",
    tags: ["wisa", "migol"],
    number_views: 777,
  },
  {
    id: "222",
    userId: userList[1].id as string,
    code_title: "Code with comments",
    code_block: "print('kkk')",
    language: "c",
    tags: ["wisa", "migol"],
  },
  {
    id: "7777",
    userId: userList[1].id as string,
    code_title: "Code with associated codes",
    code_block: "print('kkk')",
    language: "c",
    tags: ["migol"],
  },
  {
    id: "77777",
    userId: userList[1].id as string,
    code_title: "Random code",
    code_block: "print('kkk')",
    language: "c",
    tags: ["wisa", "migol"],
  },
];

const commentList: Prisma.CommentCreateManyInput[] = [
  {
    userId: userList[1].id as string,
    codeId: codeList[2].id as string,
    block: "Nice code men",
  },
  {
    userId: userList[2].id as string,
    codeId: codeList[2].id as string,
    block: "Not a good code men",
  },
];

const associatedCodes: Prisma.CodeUpdateArgs = {
  where: {
    id: codeList[3].id as string,
  },
  data: {
    associatedTo: { connect: [{ id: codeList[2].id }, { id: codeList[4].id }] },
  },
};
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
  console.log(`Creating comments for portulovers...`);
  await prisma.comment.createMany({ data: commentList });
  console.log(`Creating associated codes...`);
  await prisma.code.update(associatedCodes);

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
