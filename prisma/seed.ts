import prisma from "../utils/prisma";
import mockedCodeList from "@test-utils/mockedCodeList";

const codeList = [
  {
    codeTitle: "kkkkk",
    codeBlock: "asdasd",
    language: "c",
    tags: {
      create: [
        {
          tagName: "wisa",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const code of codeList) {
    const user = await prisma.code.create({
      data: code,
    });
    console.log(`Created user with id: ${user.id}`);
  }
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
