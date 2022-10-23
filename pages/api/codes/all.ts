import prisma from "@utils/prisma";
import algoliasearch from "algoliasearch";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { AlgoliaInterface } from "typings";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      try {
        const data = await prisma.code.findMany({
          include: { user: true },
          orderBy: { updatedAt: "desc" },
        });

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }

      break;
    }

    case "POST": {
      const { body } = req;
      const session = await getSession({ req });

      const tags: Prisma.TagCreateWithoutCodesInput[] = [];
      body.tags?.map((tag: string) => tags.push({ tagName: tag }));

      const dataT: Prisma.CodeCreateManyUserInput = {
        ...body,
        userId: session?.user.id,
        tags: { create: tags },
      };
      console.log(dataT);

      const algoliaData: AlgoliaInterface = {
        objectID: "",
        codeTitle: body.codeTitle,
        description: body.description,
        _tags: body.tags,
        language: body.language,
        updatedAt: new Date(),
        user: {
          name: session?.user.name ?? null,
          image: session?.user.image ?? null,
        },
        updateAtTimestamp: 0,
      };

      try {
        const data = await prisma.code.create({
          data: dataT,
          select: { updatedAt: true, id: true },
        });
        algoliaData.objectID = data.id;
        algoliaData.updatedAt = data.updatedAt;
        algoliaData.updateAtTimestamp = moment(data.updatedAt).unix();

        // const client = algoliasearch(
        //   "IEWGM4QLJ8",
        //   process.env.ALGOLIA_ADMIN_KEY as string
        // );
        // const index = client.initIndex("mrfisch");
        //
        // index
        //   .saveObject(algoliaData)
        //   .then(({ objectID }) => console.log(objectID));

        res.status(201).json("Code created with success");
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).send(err.message);
      }

      break;
    }
  }
}
