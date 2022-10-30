import prisma from "@utils/prisma";
import algoliasearch from "algoliasearch";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { AlgoliaInterface } from "typings";
import { Prisma } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
          orderBy: { updated_at: "desc" },
        });

        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(400).json(err.message);
      }

      break;
    }

    case "POST": {
      const { body } = req;
      const session = await unstable_getServerSession(req, res, authOptions);
      const dataT: Prisma.CodeCreateManyUserInput = {
        ...body,
        userId: session?.user.id,
      };

      const algoliaData: AlgoliaInterface = {
        objectID: "",
        code_title: body.code_title,
        description: body.description,
        _tags: body.tags,
        language: body.language,
        updated_at: new Date(),
        user: {
          name: session?.user.name ?? null,
          image: session?.user.image ?? null,
        },
        updated_at_timestamp: 0,
      };

      try {
        const data = await prisma.code.create({
          data: dataT,
          select: { updated_at: true, id: true },
        });

        algoliaData.objectID = data.id;
        algoliaData.updated_at = data.updated_at;
        algoliaData.updated_at_timestamp = moment(data.updated_at).unix();

        const client = algoliasearch(
          "IEWGM4QLJ8",
          process.env.ALGOLIA_ADMIN_KEY as string
        );
        const index = client.initIndex("mrfisch");

        index
          .saveObject(algoliaData)
          .then(({ objectID }) => console.log(objectID));

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
